
import React from 'react';

interface LoginOptionsProps {
  onForgotPassword: () => void;
}

const LoginOptions: React.FC<LoginOptionsProps> = ({ onForgotPassword }) => {
  return (
    <div className="flex items-center justify-between pt-1 pb-1">
      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 rounded transition-colors"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
          Remember me
        </label>
      </div>
      <button
        type="button"
        className="text-sm text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
        onClick={onForgotPassword}
      >
        Forgot password?
      </button>
    </div>
  );
};

export default LoginOptions;
