import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTES } from '@/lib/constants';

export function EmployeeNumberForm() {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeNumber.trim()) {
      setError('Veuillez saisir votre numéro d\'employé');
      return;
    }
    navigate(ROUTES.HOME);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto">
      <div className="space-y-2">
        <Label 
          htmlFor="employee-number" 
          className="text-primary font-medium"
        >
          Numéro d'employé
        </Label>
        <Input
          id="employee-number"
          type="number"
          value={employeeNumber}
          onChange={(e) => {
            setEmployeeNumber(e.target.value);
            setError('');
          }}
          placeholder="Entrez votre numéro d'employé"
          className={cn(
            "h-12 px-4 bg-white border-gray-200 rounded-lg",
            "transition-all duration-200 focus:scale-[1.02]",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary"
          )}
        />
        {error && (
          <p className="text-sm text-red-500 animate-shake">
            {error}
          </p>
        )}
      </div>
      <Button 
        type="submit" 
        className={cn(
          "w-full h-12 bg-primary hover:bg-primary/90",
          "transition-all duration-200 hover:scale-[1.02]",
          "text-white font-medium text-lg rounded-lg"
        )}
      >
        Continuer
      </Button>
    </form>
  );
}