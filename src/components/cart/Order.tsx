"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

interface CartItem {
  id: number;
  name: string;
  price: number;
  logo?: string;
}

interface OrderProps {
  cartCombo: any[];
  cartItems: CartItem[];
  refetch: () => void;
}

export default function Order({ cartCombo = [], cartItems = [], refetch }: OrderProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [referal, setReferal] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const comboTotal = cartCombo.reduce(
    (sum, item) => sum + Number(item?.discounted_price || 0),
    0
  );
  const cartTotal = total + comboTotal;

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (typeof document !== "undefined") document.body.style.overflow = "auto";
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const eventIds: number[] = (cartItems || []).map((item) => item.id);
      const combo_ids: number[] = (cartCombo || []).map((item: any) => item.id);
      const event_combo_ids: number[][] = (cartCombo || []).map(
        (item: any) => item.array_of_evid || []
      );

      const combinedEventIds: number[] = [];
      event_combo_ids.forEach((arr) => arr.forEach((i) => combinedEventIds.push(Number(i))));
      eventIds.forEach((i) => combinedEventIds.push(Number(i)));

      if (!transactionId) {
        alert("Please enter transaction id");
        return;
      }

      const transactionResponse = await api.post("/transaction", {
        event_id: combinedEventIds,
        transaction_id: transactionId,
        referral_code: referal || "0mux2h",
        combo_id: combo_ids || [],
      });

      if (transactionResponse.status === 200) {
        await api.delete("/cart");
        alert("Checkout successful!");
        router.push("/orders");
        closeModal();
        refetch();
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to process checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <p className="text-center text-xl md:text-3xl my-2 text-primary">Order Summary</p>
      <hr />

      <div className="text-foreground text-base md:text-lg px-4">
        {cartItems.map((item) => (
          <div key={item.id} className="grid grid-cols-12 my-2">
            <p className="col-span-10">{item.name}</p>
            <p className="col-span-2 ml-auto flex justify-center items-center gap-1">
              <span>₹</span> {Number(item.price)}
            </p>
          </div>
        ))}
      </div>

      <div className="text-foreground text-sm md:text-base px-4">
        {cartCombo.map((item: any) => (
          <div key={item.id} className="grid grid-cols-12 my-2">
            <p className="col-span-10">{item.combo_name}</p>
            <p className="col-span-2 ml-auto flex justify-center items-center gap-1">
              <span>₹</span> {Number(item.discounted_price)}
            </p>
          </div>
        ))}
      </div>

      <hr />
      <div className="grid grid-cols-12 my-2 text-foreground text-lg md:text-2xl px-4">
        <p className="col-span-10">Order Total</p>
        <p className="col-span-2 ml-auto flex justify-center items-center gap-1">
          <span>₹</span> {cartTotal}
        </p>
      </div>

      <div className="mx-6 mt-6">
        <button
          className="bg-primary text-primary-foreground px-5 py-2 rounded-xl w-full"
          onClick={handleCheckoutClick}
        >
          Checkout
        </button>
        <br />
        <Link href="/events">
          <button className="bg-secondary text-secondary-foreground px-5 py-2 rounded-xl w-full mt-3">
            Explore Events
          </button>
        </Link>
      </div>

      {isModalOpen && (
        <div className="">
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeModal}></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="p-6 rounded-lg shadow-lg bg-card w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
              <h2 className="text-2xl mb-4 text-center text-primary">Checkout</h2>
              <p className="text-center mb-4 text-foreground">
                Scan the QR code and enter the transaction id below.
              </p>

              <div className="flex justify-center mb-4">
                <img src="/assets/payment/QR.jpg" alt="QR Code" className="w-32 h-32" />
              </div>

              <div className="text-foreground text-base mb-4 flex justify-center items-center gap-2">
                <p>Order Total:</p>
                <div className="flex justify-center items-center gap-1">
                  <span>₹</span> {cartTotal}
                </div>
              </div>

              <div className="">
                <input
                  type="text"
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-3 text-foreground bg-background"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Referral code (optional)"
                  value={referal}
                  onChange={(e) => setReferal(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-3 text-foreground bg-background"
                />
              </div>

              <div className="text-muted-foreground text-sm">
                Note: PhonePe users enter UTR in transaction id.
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <button
                  className="bg-muted text-foreground px-4 py-2 rounded-lg"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
