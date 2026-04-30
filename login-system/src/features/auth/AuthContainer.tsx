import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Background } from '../../components/layout/Background';
import { Header } from '../../components/layout/Header';
import { Onboarding } from './views/Onboarding';
import { Login } from './views/Login';
import { ForgotPassword } from './views/ForgotPassword';
import { VerifyOTP } from './views/VerifyOTP';
import { ResetPassword } from './views/ResetPassword';
import { ResetSuccess } from './views/ResetSuccess';
import { BasicInfo } from './views/BasicInfo';
import { ChooseGoals } from './views/ChooseGoals';

export type AuthView = 
  | 'onboarding'
  | 'login'
  | 'forgot_password'
  | 'verify_otp'
  | 'reset_password'
  | 'reset_success'
  | 'basic_info'
  | 'choose_goals'
  | 'home';

export function AuthContainer() {
  const [currentView, setCurrentView] = useState<AuthView>('onboarding');

  const navigateTo = (view: AuthView) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'onboarding':
        return <Onboarding onNavigate={navigateTo} key="onboarding" />;
      case 'login':
        return <Login onNavigate={navigateTo} key="login" />;
      case 'forgot_password':
        return <ForgotPassword onNavigate={navigateTo} key="forgot_password" />;
      case 'verify_otp':
        return <VerifyOTP onNavigate={navigateTo} key="verify_otp" />;
      case 'reset_password':
        return <ResetPassword onNavigate={navigateTo} key="reset_password" />;
      case 'reset_success':
        return <ResetSuccess onNavigate={navigateTo} key="reset_success" />;
      case 'basic_info':
        return <BasicInfo onNavigate={navigateTo} key="basic_info" />;
      case 'choose_goals':
        return <ChooseGoals onNavigate={navigateTo} key="choose_goals" />;
      case 'home':
        return (
          <div key="home" className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Welcome Home</h1>
            <p className="text-brand-textMuted">You have successfully completed the flow.</p>
          </div>
        );
      default:
        return <Onboarding onNavigate={navigateTo} key="onboarding" />;
    }
  };

  return (
    <Background>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 w-full max-w-7xl mx-auto overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </Background>
  );
}
