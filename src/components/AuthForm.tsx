
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, EyeIcon, EyeOffIcon } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'signup';
}

interface FormState {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  acceptTerms?: boolean;
}

const AuthForm = ({ type }: AuthFormProps) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (type === 'login') {
        // Login logic would go here
        toast({
          title: "Login Successful",
          description: "Welcome back to CallTrack!",
        });
      } else {
        // Signup logic would go here
        toast({
          title: "Account Created",
          description: "Welcome to CallTrack! Your account has been created successfully.",
        });
      }

      // Clear form or redirect
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "There was a problem processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isLoginForm = type === 'login';

  return (
    <div className="glass-panel rounded-2xl p-8 w-full max-w-md mx-auto animate-scale-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">
          {isLoginForm ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-muted-foreground">
          {isLoginForm 
            ? 'Sign in to access your CallTrack dashboard' 
            : 'Start managing your calls more efficiently'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLoginForm && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formState.firstName}
                onChange={handleInputChange}
                required
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formState.lastName}
                onChange={handleInputChange}
                required
                autoComplete="family-name"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formState.email}
            onChange={handleInputChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {isLoginForm && (
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={isLoginForm ? '••••••••' : 'Create a password'}
              value={formState.password}
              onChange={handleInputChange}
              required
              autoComplete={isLoginForm ? 'current-password' : 'new-password'}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {!isLoginForm && (
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              checked={formState.acceptTerms}
              onCheckedChange={(checked) => 
                setFormState(prev => ({ ...prev, acceptTerms: checked === true }))
              }
              required
            />
            <Label htmlFor="acceptTerms" className="text-sm font-normal">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
        )}

        <Button type="submit" className="w-full button-shine" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isLoginForm ? 'Signing in...' : 'Creating account...'}
            </span>
          ) : (
            <>{isLoginForm ? 'Sign in' : 'Create account'}</>
          )}
        </Button>

        <div className="mt-6 text-center text-sm">
          {isLoginForm ? (
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-border flex">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
