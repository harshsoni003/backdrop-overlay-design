import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface UserCredits {
  id: string;
  user_id: string;
  credits_remaining: number;
  monthly_upgrade: boolean;
  yearly_upgrade: boolean;
  created_at: string;
  updated_at: string;
}

export const useUserCredits = (user: User | null) => {
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch user credits
  const fetchCredits = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching credits:', error);
        return;
      }

      if (!data) {
        // Create initial credits record if it doesn't exist
        const { data: newCredits, error: createError } = await supabase
          .from('user_credits')
          .insert({
            user_id: user.id,
            credits_remaining: 10,
            monthly_upgrade: false,
            yearly_upgrade: false
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating credits:', createError);
          return;
        }

        setCredits(newCredits);
      } else {
        setCredits(data);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setLoading(false);
    }
  };

  // Deduct credits
  const deductCredits = async (amount: number = 1): Promise<boolean> => {
    if (!user || !credits) return false;

    if (credits.credits_remaining < amount) {
      return false; // Not enough credits
    }

    try {
      const { data, error } = await supabase
        .from('user_credits')
        .update({
          credits_remaining: credits.credits_remaining - amount
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error deducting credits:', error);
        return false;
      }

      setCredits(data);
      return true;
    } catch (error) {
      console.error('Error deducting credits:', error);
      return false;
    }
  };

  // Fetch credits when user changes
  useEffect(() => {
    if (user) {
      fetchCredits();
    } else {
      setCredits(null);
    }
  }, [user]);

  // Set up real-time subscription for credits updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('user_credits_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_credits',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' && payload.new) {
            setCredits(payload.new as UserCredits);
          } else if (payload.eventType === 'INSERT' && payload.new) {
            setCredits(payload.new as UserCredits);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    credits,
    loading,
    deductCredits,
    refetchCredits: fetchCredits
  };
};