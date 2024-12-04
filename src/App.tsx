import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from '@/pages/auth-page';
import { HomePage } from '@/pages/home-page';
import { WeldingProgressPage } from '@/pages/welding-progress-page';
import { ROUTES } from '@/lib/constants';
import { UserProvider } from '@/contexts/user-context';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.AUTH} element={<AuthPage />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.WELDING_PROGRESS} element={<WeldingProgressPage />} />
          <Route path="*" element={<Navigate to={ROUTES.AUTH} replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </UserProvider>
  );
}

export default App;