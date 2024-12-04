import { Logo } from '@/components/ui/logo';
import { EmployeeNumberForm } from '@/components/auth/employee-number-form';

export function AuthPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-md space-y-10 px-4">
        <div className="space-y-6">
          <Logo size="lg" className="mx-auto" />
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-primary font-nunito">
              Bienvenue
            </h1>
            <p className="text-sm text-textSecondary font-nunito">
              Connectez-vous avec votre numéro d'employé
            </p>
          </div>
        </div>
        <EmployeeNumberForm />
      </div>
    </div>
  );
}