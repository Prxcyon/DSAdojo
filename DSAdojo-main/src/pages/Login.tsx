import React, { useState, ReactNode, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

// Simple Card, Input, Label, and Button components for demo
const Card: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative overflow-hidden bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-auto border border-gray-200 ${className}`}>{children}</div>
);
const CardHeader: React.FC<{ children: ReactNode }> = ({ children }) => <div className="mb-6">{children}</div>;
const CardTitle: React.FC<{ children: ReactNode }> = ({ children }) => <h2 className="text-2xl font-bold mb-2">{children}</h2>;
const CardDescription: React.FC<{ children: ReactNode }> = ({ children }) => <p className="text-gray-500 mb-4">{children}</p>;
const CardContent: React.FC<{ children: ReactNode }> = ({ children }) => <div className="mb-6">{children}</div>;
const CardFooter: React.FC<{ children: ReactNode }> = ({ children }) => <div>{children}</div>;
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => <input {...props} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-2" />;
const Label: React.FC<{ children: ReactNode; htmlFor: string }> = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="block font-medium mb-1">{children}</label>;
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => <button {...props} className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all mt-2">{children}</button>;

// Shiny border effect
const ShineBorder = () => (
  <div className="shine-border pointer-events-none absolute inset-0 rounded-xl" />
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    // Supabase login
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ background: '#f3f4f6' }}>
      <Card className="bg-white border border-gray-200 shadow-lg">
        <ShineBorder />
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <CardFooter>
              <Button type="submit">Sign In</Button>
            </CardFooter>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">New here? </span>
            <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 