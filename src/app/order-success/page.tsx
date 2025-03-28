"use client";
import { Button } from '@/components/ui/button';
import { Home, ShoppingBag, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <div>
      <Nav/>
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center"
      >
        {/* Success icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <div className="bg-green-500 p-3 rounded-full">
              <Check className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. We're preparing your order with care.
        </p>
        
        <div className="border-t border-gray-100 py-4 mb-4">
          <p className="text-sm text-gray-500">
            You'll receive a confirmation email shortly with your order details.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-4 w-4" /> 
            Return Home
          </Button>
          
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => router.push("/orders")}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> 
            Track Orders
          </Button>
        </div>
      </motion.div>
      
      <div className="mt-6 text-sm text-gray-400">
        Questions? Contact our support team at support@example.com
      </div>
    </div>
    <Footer/>
    </div>
  );
}