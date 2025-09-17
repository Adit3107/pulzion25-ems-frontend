"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NetworkBackground } from '@/components/ui/network-background';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RegisterPage() {
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
      
      <div className="z-10 w-full max-w-2xl">
        <Card className="bg-card/70 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
              <Gamepad2 /> REGISTER
            </CardTitle>
            <CardDescription>Join the AI Gridlock and get your ticket.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Enter Phone No.</Label>
                  <Input id="phone" type="tel" placeholder="+1 234 567 890" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Select Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College</Label>
                  <Select>
                    <SelectTrigger id="college">
                      <SelectValue placeholder="Select College" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pict">PICT</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Select Year</Label>
                   <Select>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fe">First Year</SelectItem>
                      <SelectItem value="se">Second Year</SelectItem>
                      <SelectItem value="te">Third Year</SelectItem>
                      <SelectItem value="be">Final Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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
              <Button type="submit" className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-purple-600 text-primary-foreground font-bold hover:opacity-90 transition-opacity">
                Sign Up
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                LOGIN
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
