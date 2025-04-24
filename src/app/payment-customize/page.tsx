"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";

export default function Payment() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  const customizeOrderId = searchParams.get("customizeOrderId");
  console.log(customizeOrderId,"cusOrderId")
  const total = searchParams.get("total");
  const pidx = searchParams.get("pidx"); 

  const [selectedMethod, setSelectedMethod] = useState("");

  const paymentMethods = [
    {
      id: "cash-on-delivery",
      title: "Cash on Delivery",
      subtitle: "Cash on Delivery",
      icon: "/image/COD.png",
    },
    {
      id: "khalti",
      title: "Khalti",
      subtitle: "Khalti Digital Wallet",
      icon: "/image/khalti.png",
    },
  ];

  const handlePayment = async ()    => {
    if (!selectedMethod) {
      toast.warning("Please select a payment method");
      return;
    }

    if (!customizeOrderId) {
      toast.error("Invalid order details. Please try again.");
      return;
    }

    try {
      if (selectedMethod === "khalti") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/khalti/customize/initiate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customizeOrderId }),
          }
        );

        const data = await response.json();

        if (response.ok && data.khaltiPaymentUrl) {
          toast.success("Redirecting to Khalti for payment...");
          router.push(data.khaltiPaymentUrl); // Redirects user to Khalti payment page
        } else {
          toast.error(data.error || "Payment failed. Please try again.");
        }
      } else if (selectedMethod === "cash-on-delivery") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/customize/cod/add-order`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customizeOrderId }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success("Order placed successfully! Pay on delivery.");
          console.log("orderId in payment page", customizeOrderId)
          router.push(`/customize/order/success?customizeOrderId=${customizeOrderId}`);
        } else {
          toast.error(data.error || "Something went wrong. Please try again.");
        }
      } else {
        toast.error("This payment method is not supported yet.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        "Payment processing failed. Please check your network and try again."
      );
    }
  };    

useEffect(() => {
  const verifyPayment = async () => {
    if (pidx && customizeOrderId && !verified) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/khalti/customize/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pidx, customizeOrderId }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Payment verified successfully!");
          setVerified(true);
          router.push(`/customize/order/success?customizeOrderId=${customizeOrderId}`);
        } else {
          toast.error(data.error || "Payment verification failed!");
          router.push("/customize");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Something went wrong.");
      }
    }
  };

  verifyPayment();
}, [pidx, customizeOrderId, verified, router]);

  return (
    <div>
      <Nav />
      <div className="bg-gray-50 mt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Select Payment Method
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Payment Methods Section */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`relative bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src={method.icon}
                        alt={method.title}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                      <h3 className="font-medium text-gray-900">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {method.subtitle}
                      </p>
                    </div>

                    {selectedMethod === method.id && (
                      <div className="absolute top-3 right-3">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-96 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 pb-4 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="py-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-900">Rs. {total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span className="text-gray-900">Included</span>
                  </div>
                </div>

                <button
                  disabled={!selectedMethod}
                  onClick={handlePayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium transition-colors"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
