
// "use client";
// import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

// export default function Payment() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const orderId = searchParams.get("orderId");
//   const total = searchParams.get("total");

//   const [selectedMethod, setSelectedMethod] = useState('');

//   const paymentMethods = [
//     { id: 'credit-card', title: 'Credit/Debit Card', subtitle: 'Credit/Debit Card', icon: '/credit-card-icon.svg' },
//     { id: 'khalti', title: 'Khalti', subtitle: 'khalti', icon: '/credit-card-icon.svg' },
//     { id: 'ime-pay', title: 'IME Pay', subtitle: 'IME Pay Mobile Wallet', icon: '/ime-pay-icon.svg' },
//     { id: 'cash-on-delivery', title: 'Cash on Delivery', subtitle: 'Pay at delivery', icon: '/cash-icon.svg' },
//   ];

// //   const handlePayment = async () => {
// //     if (!selectedMethod) {
// //       toast.warning("Please select the payment method");
// //       return;
// //     }

// //     // Make API call to process payment
// //     try {
// //       const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/khalti/initiate`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ orderId:"67dcd78a93e80d971d8aab25"}),
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         toast.success("Payment successful!");
// //         router.push("/order-success"); // Redirect to order success page
// //       } else {
// //         toast.error("Payment failed. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error("Payment error:", error);
// //       alert("Payment processing failed.");
// //     }
// //   };


// const handlePayment = async () => {
//   if (!selectedMethod) {
//     toast.warning("Please select a payment method");
//     return;
//   }

//   if (!orderId) {
//     toast.error("Invalid order details. Please try again.");
//     return;
//   }

//   try {
//     if (selectedMethod === "khalti") {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/khalti/initiate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderId }),
//       });

//       const data = await response.json();

//       if (response.ok && data.khaltiPaymentUrl) {
//         toast.success("Redirecting to Khalti for payment...");
//         router.push(data.khaltiPaymentUrl); // Redirects user to Khalti payment page
//       } else {
//         toast.error(data.error || "Payment failed. Please try again.");
//       }
//     } else if (selectedMethod === "cash-on-delivery") {
//       // Handle cash-on-delivery separately
//       const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/cash-on-delivery`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderId }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Order placed successfully! Pay on delivery.");
//         router.push("/order-success"); // Redirect to success page
//       } else {
//         toast.error(data.error || "Something went wrong. Please try again.");
//       }
//     } else {
//       toast.error("This payment method is not supported yet.");
//     }
//   } catch (error) {
//     console.error("Payment error:", error);
//     toast.error("Payment processing failed. Please check your network and try again.");
//   }
// };

  

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Choose a Payment Method</h2>
//         <p className="text-gray-600">Total: Rs. {total}</p>

//         <div className="mt-4">
//           {paymentMethods.map((method) => (
//             <div 
//               key={method.id} 
//               className={`p-3 border rounded-lg flex items-center gap-4 cursor-pointer ${selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
//               onClick={() => setSelectedMethod(method.id)}
//             >
//               <Image src={method.icon} alt={method.title} width={30} height={30} />
//               <div>
//                 <p className="font-medium">{method.title}</p>
//                 <p className="text-sm text-gray-500">{method.subtitle}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button 
//           className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-300"
//           disabled={!selectedMethod}
//           onClick={handlePayment}
//         >
//           Confirm Payment
//         </button>
//       </div>
//     </div>
//   );
// }


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

  const orderId = searchParams.get("orderId");
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

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.warning("Please select a payment method");
      return;
    }

    if (!orderId) {
      toast.error("Invalid order details. Please try again.");
      return;
    }

    try {
      if (selectedMethod === "khalti") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/khalti/initiate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
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
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/add-order/cod`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success("Order placed successfully! Pay on delivery.");
          console.log("orderId in payment page", orderId)
          router.push(`/order-success?orderId=${orderId}`);
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

  // Verify Khalti Payment after redirection
  useEffect(() => {
    const verifyPayment = async () => {
      if (pidx && orderId) {
        try {
          const response = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pidx, orderId }),
          });

          const data = await response.json();

          if (response.ok) {
            toast.success("Payment verified successfully!");
            router.push(`/order-success?orderId=${orderId}`);
          } else {
            toast.error(data.error || "Payment verification failed!");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error("Something went wrong.");
        }
      }
    };

    verifyPayment();
  }, [pidx, orderId, router]);

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
