import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddCardDialog from './AddCardDialog';
import RemoveCardDialog from './RemoveCardDialog';
import { toast } from "sonner";
import { Check, CreditCard as CardIcon, Star } from "lucide-react";

interface PaymentCard {
  id: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isPreferred: boolean;
  brand: string;
}

const initialCards: PaymentCard[] = [
  {
    id: "1",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "25",
    isPreferred: true,
    brand: "visa"
  }
];

const PaymentMethodsTab = () => {
  const [cards, setCards] = useState<PaymentCard[]>(initialCards);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isRemovingCard, setIsRemovingCard] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });
  const [errors, setErrors] = useState({});

  const validateCard = (): boolean => {
    const newErrors: any = {};
    
    if (!/^\d{16}$/.test(formData.number.replace(/\s/g, ""))) {
      newErrors.number = "Please enter a valid 16-digit card number";
    }
    
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Please enter a valid expiry date (MM/YY)";
    } else {
      const [month, year] = formData.expiry.split("/");
      const now = new Date();
      const cardDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (cardDate < now) {
        newErrors.expiry = "Card has expired";
      }
    }
    
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Please enter a valid CVV (3-4 digits)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCard = () => {
    if (!validateCard()) {
      toast.error("Please correct the card information");
      return;
    }

    toast.promise(
      new Promise((resolve) => {
        setTimeout(resolve, 1500);
      }),
      {
        loading: 'Adding your card...',
        success: 'Card added successfully',
        error: 'Failed to add card. Please try again.',
      }
    );

    const [month, year] = formData.expiry.split("/");
    const newCard: PaymentCard = {
      id: Date.now().toString(),
      last4: formData.number.slice(-4),
      expiryMonth: month,
      expiryYear: year,
      isPreferred: cards.length === 0,
      brand: "visa"
    };

    setCards(prev => [...prev, newCard]);
    setIsAddingCard(false);
    setFormData({ number: "", expiry: "", cvv: "" });
  };

  const handleRemoveCard = (cardId: string) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }),
      {
        loading: 'Removing card...',
        success: 'Card removed successfully',
        error: 'Failed to remove card. Please try again.',
      }
    );

    setCards(prev => {
      const removedCard = prev.find(card => card.id === cardId);
      const remainingCards = prev.filter(card => card.id !== cardId);
      
      if (removedCard?.isPreferred && remainingCards.length > 0) {
        remainingCards[0].isPreferred = true;
      }
      
      return remainingCards;
    });
    
    setIsRemovingCard(null);
  };

  const setPreferredCard = (cardId: string) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }),
      {
        loading: 'Updating preferred card...',
        success: 'Default payment method updated',
        error: 'Failed to update default payment method',
      }
    );

    setCards(prev => prev.map(card => ({
      ...card,
      isPreferred: card.id === cardId
    })));
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
      <div className="space-y-4">
        {cards.map(card => (
          <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                <CardIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <div className="font-medium flex items-center gap-2">
                  •••• {card.last4}
                  {card.isPreferred && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Expires {card.expiryMonth}/{card.expiryYear}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!card.isPreferred && (
                <Button variant="outline" onClick={() => setPreferredCard(card.id)}>
                  Set as Default
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsRemovingCard(card.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button className="w-full" onClick={() => setIsAddingCard(true)}>
          Add New Payment Method
        </Button>
      </div>

      <AddCardDialog 
        open={isAddingCard} 
        onOpenChange={setIsAddingCard} 
        formData={formData} 
        setFormData={setFormData} 
        errors={errors} 
        handleAddCard={handleAddCard} 
      />

      <RemoveCardDialog 
        open={!!isRemovingCard} 
        onOpenChange={() => setIsRemovingCard(null)} 
        handleRemoveCard={handleRemoveCard} 
        cardId={isRemovingCard} 
      />
    </Card>
  );
};

export default PaymentMethodsTab;