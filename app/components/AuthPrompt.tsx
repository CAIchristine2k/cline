import React from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useConfig } from '~/utils/themeContext';

interface AuthPromptProps {
  title: string;
  message: string;
  returnUrl?: string;
}

export function AuthPrompt({ title, message, returnUrl }: AuthPromptProps) {
  const config = useConfig();
  
  const loginUrl = `/account/login${returnUrl ? `?return_to=${encodeURIComponent(returnUrl)}` : ''}`;

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-primary/30 rounded-sm p-12 text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-primary/20 p-4 rounded-full">
          <Lock className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 mb-8 leading-relaxed">{message}</p>
      
      <div className="space-y-4">
        <Link
          to={loginUrl}
          className="inline-flex items-center bg-primary hover:bg-primary-600 text-black font-bold py-3 px-6 rounded-sm transition-colors"
        >
          <User className="w-4 h-4 mr-2" />
          Log In
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
        
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Don't have an account?</p>
          <Link
            to="/account/register"
            className="text-primary hover:text-primary-400 font-medium text-sm underline"
          >
            Create Account
          </Link>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-600">
        <p className="text-gray-500 text-xs">
          Create an account to unlock exclusive AI-generated content and track your generations.
        </p>
      </div>
    </div>
  );
} 