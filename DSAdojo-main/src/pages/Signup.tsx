import React, { useState, ReactNode, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Paste MagicCard component here (or import if available)

// --- MagicCard component (user provided) ---
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { supabase } from '../utils/supabaseClient';

interface MagicCardProps {
  children?: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}
const MagicCard = ({
  children,
  className = '',
  gradientSize = 320,
  gradientColor = "#fff",
  gradientOpacity = 0.7,
  gradientFrom = "#e0c3fc",
  gradientTo = "#8ec5fc",
}: MagicCardProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-border duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientFrom} 0%,
              ${gradientTo} 80%,
              #fff 100%
            )
          `,
        }}
      />
      <div className="absolute inset-px rounded-2xl bg-white bg-opacity-90" />
      <motion.div
        className="pointer-events-none absolute inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};
// --- End MagicCard ---

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => <input {...props} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-2" />;
const Label: React.FC<{ children: ReactNode; htmlFor: string }> = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="block font-medium mb-1">{children}</label>;
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => <button {...props} className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all mt-2">{children}</button>;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    // Supabase signup
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ background: '#f3f4f6' }}>
      <MagicCard className="max-w-md w-full p-0">
        <div className="relative p-8">
          <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-500 mb-4">Create your account to get started</p>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="Your username" value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <Button type="submit">Sign Up</Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
          </div>
        </div>
      </MagicCard>
    </div>
  );
};

export default Signup; 