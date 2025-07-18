import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Mail } from "lucide-react";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpgradeDialog = ({ open, onOpenChange }: UpgradeDialogProps) => {
  const handleContactAdmin = () => {
    window.location.href = 'mailto:admin@maciframe.com?subject=Upgrade Request&body=Hi, I would like to upgrade my account to get more credits for image uploads.';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Out of Credits!
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            You've used all your upload credits. Upgrade your account to continue uploading images.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Upgrade Benefits:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Unlimited image uploads</li>
              <li>• Priority support</li>
              <li>• Advanced editing features</li>
              <li>• No watermarks</li>
            </ul>
          </div>
          
          <Button
            onClick={handleContactAdmin}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Admin for Upgrade
          </Button>
          
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};