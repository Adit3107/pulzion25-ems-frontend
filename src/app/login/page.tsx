"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NetworkBackground } from '@/components/ui/network-background';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 overflow-hidden">
      <NetworkBackground />
      <div className="absolute top-4 left-4 z-20">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
      </div>
      
      <div className="z-10 w-full max-w-sm">
        <Card className="bg-card/70 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
              <Gamepad2 /> LOGIN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter email address" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" required />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-purple-600 text-primary-foreground font-bold hover:opacity-90 transition-opacity">
                Login
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
