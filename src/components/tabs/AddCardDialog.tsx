import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CardError {
  number?: string; // Error message for card number
  expiry?: string; // Error message for expiry date
  cvv?: string;    // Error message for CVV
}

interface CardFormData {
  number: string; // The credit card number
  expiry: string; // The expiry date in MM/YY format
  cvv: string;    // The CVV code
}

interface AddCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: CardFormData;
  setFormData: (data: CardFormData) => void;
  errors: CardError;
  handleAddCard: () => void;
}

const AddCardDialog: React.FC<AddCardDialogProps> = ({ open, onOpenChange, formData, setFormData, errors, handleAddCard }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Input
              placeholder="1234 5678 9012 3456"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })} // Directly update the formData
              className={cn(errors.number && "border-red-500")}
            />
            {errors.number && <p className="text-sm text-red-500">{errors.number}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })} // Directly update the formData
                className={cn(errors.expiry && "border-red-500")}
              />
              {errors.expiry && <p className="text-sm text-red-500">{errors.expiry}</p>}
            </div>
            <div className="space-y-2">
              <Label>CVV</Label>
              <Input
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })} // Directly update the formData
                className={cn(errors.cvv && "border-red-500")}
              />
              {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAddCard}>Add Card</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardDialog;
