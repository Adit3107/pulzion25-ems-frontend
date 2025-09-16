"use client";

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NetworkBackground } from '@/components/ui/network-background';
import { Skeleton } from '@/components/ui/skeleton';

const WireframeCube = dynamic(() => import('@/components/ui/wireframe-cube').then(mod => mod.WireframeCube), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full aspect-square" />,
});

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <NetworkBackground />
      <div className="absolute top-4 left-4">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      <div className="flex w-full max-w-4xl items-center justify-center">
        <div className="relative hidden w-1/2 -translate-x-10 lg:block">
           <WireframeCube />
        </div>
        <Card className="z-10 w-full max-w-md bg-card/70 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
            <CardDescription>Join the AI Gridlock and get your ticket.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="pulzion_user" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="user@pulzion.co" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-secondary))] text-accent-foreground font-bold hover:opacity-90 transition-opacity">
                Register
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="#" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}