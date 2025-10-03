"use client";

import React, { useEffect, useMemo, useState } from "react";
import api from "@/api/api";
import isNotAuth from "@/context/isNotAuth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Order from "@/components/cart/Order";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type CartItem = {
  id: number;
  name: string;
  price: number;
  logo: string;
};

type ComboItem = {
  id: number;
  combo_name: string;
  discounted_price: number;
  total_price: number;
  array_of_evname: { logo: string; name: string }[];
};

function MyCartsPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCombo, setCartCombo] = useState<ComboItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isCartEmpty = !loading && !error && cartItems.length === 0 && cartCombo.length === 0;

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/cart");
      const events = response.data?.events?.events || [];
      const combos = response.data?.events?.combos || [];
      setCartItems(events as CartItem[]);
      setCartCombo(combos as ComboItem[]);
    } catch (err) {
      console.error("Failed to load cart items.", err);
      setError("Failed to load cart items.");
      setCartItems([]);
      setCartCombo([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalPrice = useMemo(() => {
    const itemsTotal = cartItems.reduce((sum, it) => sum + (Number(it.price) || 0), 0);
    const combosTotal = cartCombo.reduce((sum, c) => sum + (Number(c.discounted_price) || 0), 0);
    return itemsTotal + combosTotal;
  }, [cartItems, cartCombo]);

  const handleDeleteItemUI = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDeleteCombo = async (id: number) => {
    try {
      await api.delete(`cart/combo/${id}`);
      setCartCombo((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting combo:", error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative overflow-hidden py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-headline font-bold mt-4 mb-6 text-secondary text-center">My Cart</h1>

          {error && (
            <div className="mb-6 text-destructive">{error}</div>
          )}

          {isCartEmpty && (
            <div className="h-[500px] flex justify-center items-center text-secondary">
              <div className="border-2 rounded-xl w-full md:w-2/3 p-4 text-center text-lg md:text-xl">
                Your cart is currently empty.
              </div>
            </div>
          )}

          {!isCartEmpty && (
            <div className={`flex flex-col md:flex-row gap-8`}>
              {/* Left: Items and Combos */}
              <div className="flex flex-col justify-center items-center md:max-w-[70%] w-full space-y-4">
                {/* Events list */}
                {cartItems.length > 0 && (
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="w-full flex-grow my-4 md:my-0">
                      <div className="border-2 border-primary/50 rounded-2xl w-full max-h-56 md:max-h-none overflow-y-auto">
                        <div className="p-4 space-y-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-card/30 border border-border/40 rounded-lg p-3">
                              <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-muted-foreground">₹ {Number(item.price)}</p>
                              </div>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteItemUI(item.id)} className="flex items-center gap-2">
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Combos list */}
                {cartCombo.length > 0 && (
                  <div className="flex flex-col justify-start items-start space-y-6 border-2 border-primary/50 rounded-2xl p-4 w-full">
                    {cartCombo.map((combo, index) => (
                      <div key={combo.id} className="space-y-4 w-full">
                        <div className="flex justify-between items-start px-2 py-1 w-full">
                          <div className="text-2xl text-primary w-full">{combo.combo_name}</div>
                          <div className="flex items-start gap-4">
                            <div>
                              <div className="text-2xl text-foreground">₹ {Number(combo.discounted_price)}</div>
                              <div className="text-xs line-through text-muted-foreground">₹ {Number(combo.total_price)}</div>
                            </div>
                            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                              <AlertDialogTrigger asChild>
                                <button className="text-destructive text-sm md:text-base underline my-2">
                                  Remove
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove <strong>{combo.combo_name}</strong> from the cart? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel asChild>
                                    <Button variant="secondary">Cancel</Button>
                                  </AlertDialogCancel>
                                  <AlertDialogAction asChild>
                                    <Button variant="destructive" onClick={() => handleDeleteCombo(combo.id)}>Remove</Button>
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        <div className="flex flex-wrap w-full justify-center md:justify-start items-center gap-6">
                          {combo.array_of_evname.map((eve, idx) => (
                            <div key={`${combo.id}-${idx}`} className="flex flex-col justify-between items-center text-xs">
                              <div className="text-sm md:text-base text-foreground">{eve.name}</div>
                            </div>
                          ))}
                        </div>
                        {index !== cartCombo.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Summary */}
              <div className="md:max-w-[30%] w-full">
                <div className="border-2 border-primary/50 rounded-2xl p-2 md:p-4">
                  <Order cartCombo={cartCombo} cartItems={cartItems} refetch={fetchCartItems} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default isNotAuth(MyCartsPage);
