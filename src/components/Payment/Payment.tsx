// "use client"
// import { useState } from 'react';
// import Image from 'next/image';

// export default function Payment() {
//   const [selectedMethod, setSelectedMethod] = useState('');

//   const paymentMethods = [
//     {
//       id: 'credit-card',
//       title: 'Credit/Debit Card',
//       subtitle: 'Credit/Debit Card',
//       icon: '/credit-card-icon.svg' // Replace with your actual icon path
//     },
//     {
//       id: 'ime-pay',
//       title: 'IME Pay',
//       subtitle: 'IME Pay Mobile Wallet',
//       icon: '/ime-pay-icon.svg'
//     },
//     {
//       id: 'cash-on-delivery',
//       title: 'Cash on Delivery',
//       subtitle: 'Cash on Delivery',
//       icon: '/cod-icon.svg'
//     },
//     {
//       id: 'esewa',
//       title: 'eSewa Mobile Wallet',
//       subtitle: 'eSewa Mobile Wallet',
//       icon: '/esewa-icon.svg'
//     },
//     {
//       id: 'khalti',
//       title: 'Khalti',
//       subtitle: 'Khalti Digital Wallet',
//       icon: '/khalti-icon.svg'
//     }
//   ];

//   const handleSelectedPayment = (id:string)=>{
//     setSelectedMethod(id)
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-8">Select Payment Method</h1>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Payment Methods Section */}
//           <div className="flex-1">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {paymentMethods.map((method) => (
//                 <div
//                   key={method.id}
//                   className={`
//                     relative bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all
//                     ${selectedMethod === method.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}
//                   `}
//                   onClick={() => setSelectedMethod(method.id)}
//                 >
//                   <div className="flex flex-col items-center text-center">
//                     <div className="w-16 h-16 flex items-center justify-center mb-3">
//                       {/* For development, you can use a div with a colored background */}
//                       <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-sm">
//                         {method.id.charAt(0).toUpperCase()}
//                       </div>
//                       {/* Uncomment this when you have actual icons */}
//                       {/* <Image 
//                         src={method.icon} 
//                         alt={method.title} 
//                         width={48} 
//                         height={48} 
//                         className="object-contain" 
//                       /> */}
//                     </div>
//                     <h3 className="font-medium text-gray-900">{method.title}</h3>
//                     <p className="text-sm text-gray-500 mt-1">{method.subtitle}</p>
//                   </div>
                  
//                   {selectedMethod === method.id && (
//                     <div className="absolute top-3 right-3">
//                       <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Order Summary Section */}
//           <div className="lg:w-96 mt-8 lg:mt-0">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-lg font-semibold text-gray-900 pb-4 border-b border-gray-200">Order Summary</h2>
              
//               <div className="py-4 space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal (2 items)</span>
//                   <span className="text-gray-900">Rs. 4,268</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping Fee</span>
//                   <span className="text-gray-900">Included</span>
//                 </div>
//               </div>
              
//               <div className="pt-4 border-t border-gray-200">
//                 <div className="flex justify-between items-center mb-6">
//                   <span className="text-lg font-semibold text-gray-900">Total Amount</span>
//                   <span className="text-lg font-semibold text-orange-500">Rs. 4,268</span>
//                 </div>
                
//                 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium transition-colors">
//                   Proceed to Pay
//                 </button>
                
//                 <div className="flex items-center justify-center mt-4 text-gray-500 text-sm">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                   <span>Secure payment processing</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








  //add shipping address
//   const response = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//         const addShippingData = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/add-order`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 clientId: clientId,
//                 pickUpAddress: pickupAddress,
//                 deliveryAddress,
//                 promoCode,
//                 totalPrice: total,
//                 cartId: [...selectedItems],
//                 number: number || "",  
//                 paymentMethod: "Khalti"
//             })
//         });

//         const data = await addShippingData.json();
//         console.log("Response:", data);

//         if (data.success) {  
//             toast.success("Order placed successfully!");

//             // Clear form fields
//             setPickupAddress("");
//             setDeliveryAddress("");
//             setPromoCode("");
//             setTotal(0);
//             setSelectedItems([]);
//             setNumber("");

//             // Fetch updated cart details (removes checked out items)
//             fetchCartDetails();
//         }
//     } catch (error) {
//         console.error("Error in API request:", error);
//         toast.error("Failed to place order.");
//     } finally {
//         setLoading(false);
//     }
// };