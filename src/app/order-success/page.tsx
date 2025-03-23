"use client";
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-green-500">🎉 Order Placed Successfully!</h1>
      <p className="text-gray-600 mt-2">Thank you for shopping with us.</p>
      <Button 
        className="mt-6 px-6 py-2 text-white rounded-lg"
        onClick={() => router.push("/")}
      >
        <span><Home size={24} /></span> Back to Home
      </Button>
    </div>
  );
}
