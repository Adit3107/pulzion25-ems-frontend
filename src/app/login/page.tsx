"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedGridBackground } from '@/components/ui/animated-grid-background';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import api from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import type { User } from '@/lib/user';
import isAuth from '@/context/isAuth';

function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/user/signin', {
        email,
        password,
      });

      const { token, user } = res.data as {
        token: string;
        user: any;
      };

      // Persist token for subsequent requests
      localStorage.setItem('token', token);

      // Map API user to our User type and keep house null for now
      const mappedUser: User = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        mobile_number: user.mobile_number,
        college: user.college,
        year: user.year,
        created_at: user.created_at,
        updated_at: user.updated_at,
        referral_code: user.referral_code,
        count: undefined,
        house: null as unknown as User['house'],
      };

      setUser(mappedUser);

      // Redirect to home after successful login
      router.push('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 overflow-hidden">
      <AnimatedGridBackground />
      <div className="absolute top-4 left-4 z-20">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
      </div>
      
      <div className="z-10 w-full max-w-sm">
        <Card className="bg-background/70 backdrop-blur-lg border-primary/50">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
              <Gamepad2 /> LOGIN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500" role="alert">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-opacity"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
             <div className="mt-4 text-center text-sm">
              <Link href="#" className="underline">
                Forgot password?
              </Link>
            </div>
            <div className="mt-2 text-center text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="underline">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
