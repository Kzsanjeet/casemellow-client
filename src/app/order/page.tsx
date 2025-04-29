'use client';
import Footer from '@/components/Footer/Footer';
import Nav from '@/components/Nav/Nav';
import OrderTracking, { OrderStatus } from '@/components/OrderTrack/OrderTracking';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const [trackOrderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | "">("");

  const handleCheckStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/get-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackOrderId }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('orderId in payment page', trackOrderId);
        setOrderStatus(data.data.orderStatus as OrderStatus); // ✅ cast properly here
        setOrderId("")
      } else {
        toast.error('Invalid order Id');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
<div className="bg-white min-h-screen flex flex-col">
  <Nav />

  <div className="py-28 px-4 flex flex-col items-center">
    {/* Heading */}
    <div className="text-center mb-10 mt-4 pt-12 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
        Track Order
        <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
      </h1>
      <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">
        Enter your Order ID to see the latest delivery status.
      </p>
    </div>

    {/* Order ID Input Section */}
    <div className="w-full max-w-md bg-gray-50 shadow-md border border-gray-200 rounded-lg p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckStatus();
        }}
        className="flex flex-col space-y-4"
      >
        <label className="text-sm font-medium text-gray-700">
          Order ID
          <Input
            value={trackOrderId}
            required
            placeholder="e.g. #1234567890"
            onChange={(e) => setOrderId(e.target.value)}
            className="mt-1"
          />
        </label>

        <button
          type="submit"
          className="bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded transition"
        >
          Check Status
        </button>
      </form>
    </div>
  </div>
    {/* Tracking Component */}
    {orderStatus && (
        <div className="mt-8">
          <OrderTracking orderStatus={orderStatus} />
        </div>
      )}
  <Footer />
</div>

  );
};

export default Page;
