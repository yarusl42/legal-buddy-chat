import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface RemoveCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleRemoveCard: (cardId: string) => void;
  cardId: string | null;
}

const RemoveCardDialog: React.FC<RemoveCardDialogProps> = ({ open, onOpenChange, handleRemoveCard, cardId }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Card</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this card? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => cardId && handleRemoveCard(cardId)}>Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveCardDialog;
