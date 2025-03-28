// export default function Cart() {
//   const [items, setItems] = useState<ICart[]>([]);

//   const [location] = useState({
//     address: "Airport, Kathmandu Metro 9 - Sinamangal Area",
//     province: "Bagmati Province"
//   });

//   const [voucherCode, setVoucherCode] = useState("");

//   // Calculate totals
//   const calculateSubtotal = () => {
//     return items.reduce((total, item) => {
//       if (item.selected) {
//         return total + (item.price * item.quantity);
//       }
//       return total;
//     }, 0);
//   };

//   const subtotal = calculateSubtotal();
//   const shipping = 0;
//   const total = subtotal + shipping;

//   // Handle quantity changes
//   const updateQuantity = (id:Number, newQuantity:any) => {
//     if (newQuantity < 1) return;
    
//     setItems(items.map(item => 
//       item.id === id ? {...item, quantity: newQuantity} : item
//     ));
//   };

//   // Handle item selection
//   const toggleSelection = (id:Number) => {
//     setItems(items.map(item => 
//       item.id === id ? {...item, selected: !item.selected} : item
//     ));
//   };

//   // Handle item removal
//   const removeItem = (id:Number) => {
//     setItems(items.filter(item => item.id !== id));
//   };

//   // Calculate discount percentage
//   const getDiscountPercentage = (original:any, current:any) => {
//     return Math.round(((original - current) / original) * 100);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 mt-20">
//       {/* Header */}
//       <div className="border-b bg-white py-4 px-4 md:px-6 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">Your Cart</h1>
//           <span className="text-gray-500">{items.length} items</span>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Cart Items Section */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg shadow-sm border">
//             {/* Select All Header */}
//             <div className="p-4 border-b flex items-center">
//               <input 
//                 type="checkbox"
//                 checked={items.every(item => item.selected)}
//                 onChange={() => {
//                   const allSelected = items.every(item => item.selected);
//                   setItems(items.map(item => ({...item, selected: !allSelected})));
//                 }}
//                 className="h-5 w-5 rounded border-gray-300 text-blue-600"
//               />
//               <span className="ml-3 text-sm font-medium">SELECT ALL ({items.length} ITEM{items.length !== 1 ? 'S' : ''})</span>
              
//               <button className="ml-auto flex items-center text-sm text-gray-500">
//                 <Trash2 size={16} />
//                 <span className="ml-1">DELETE</span>
//               </button>
//             </div>

//             {/* Cart Items */}
//             {items.map((item) => (
//               <div key={item.id} className="p-4 border-b flex flex-col sm:flex-row gap-4">
//                 <div className="flex items-start gap-3">
//                   <input
//                     type="checkbox"
//                     checked={item.selected}
//                     onChange={() => toggleSelection(item.id)}
//                     className="h-5 w-5 mt-2 rounded border-gray-300 text-blue-600"
//                   />
//                   <div className="w-24 h-24 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       {/* Placeholder for product image */}
//                       <span className="text-xs text-gray-500">Product Image</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex-1 flex flex-col">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {item.brand}, {item.size && `Size: ${item.size},`} Color Family: {item.color}
//                       </p>
                      
//                       {item.limited && (
//                         <p className="text-sm text-orange-500 mt-1">
//                           {item.remaining} item(s) left
//                         </p>
//                       )}
//                     </div>
                    
//                     <div className="flex space-x-3">
//                       <button 
//                         className="text-gray-400 hover:text-gray-700"
//                         onClick={() => removeItem(item.id)}
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="mt-auto pt-3 flex justify-between items-end">
//                     <div>
//                       <p className="font-medium text-orange-500">Rs. {item.price.toLocaleString()}</p>
//                       <div className="flex items-center gap-2">
//                         <p className="text-sm text-gray-500 line-through">Rs. {item.originalPrice.toLocaleString()}</p>
//                         <span className="text-sm text-green-600">
//                           {getDiscountPercentage(item.originalPrice, item.price)}% OFF
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex items-center border rounded-md">
//                       <button 
//                         className="px-3 py-1 text-gray-500 hover:bg-gray-100"
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       >
//                         −
//                       </button>
//                       <span className="px-3 py-1 font-medium">{item.quantity}</span>
//                       <button 
//                         className="px-3 py-1 text-gray-500 hover:bg-gray-100"
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Order Summary Section */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
//             <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
//             {/* Location */}
//             <div className="mb-4">
//               <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
//               <div className="flex items-start gap-2">
//                 <MapPin size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
//                 <p className="text-sm text-gray-600">
//                   {location.address}, {location.province}
//                 </p>
//               </div>
//             </div>
            
//             {/* Summary Calculations */}
//             <div className="border-t pt-4">
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-600">Subtotal ({items.filter(i => i.selected).length} items)</span>
//                 <span>Rs. {subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <span className="text-gray-600">Shipping Fee</span>
//                 <span>Rs. {shipping.toLocaleString()}</span>
//               </div>
              
//               {/* Voucher Code */}
//               <div className="mb-4 flex gap-2">
//                 <input
//                   type="text"
//                   value={voucherCode}
//                   onChange={(e) => setVoucherCode(e.target.value)}
//                   placeholder="Enter Voucher Code"
//                   className="border rounded-md px-3 py-2 text-sm flex-1"
//                 />
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
//                   APPLY
//                 </button>
//               </div>
              
//               {/* Total */}
//               <div className="flex justify-between items-center border-t pt-4">
//                 <span className="font-medium">Total</span>
//                 <span className="text-xl font-medium text-orange-500">Rs. {total.toLocaleString()}</span>
//               </div>
              
//               {/* Checkout Button */}
//               <button 
//                 className="mt-4 w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
//                 disabled={!items.some(item => item.selected)}
//               >
//                 PROCEED TO CHECKOUT ({items.filter(i => i.selected).length})
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












// "use client"
// import React, { useEffect, useState } from 'react';
// import { Trash2, MapPin } from 'lucide-react';
// import Cookies from "js-cookie";
// import { toast } from 'sonner';
// import Image from 'next/image';



// export interface CartItem {
//   _id: string;
//   clientId: string;
//   productId: {
//     _id: string;
//     productName: string;
//     brands: string;
//     phoneModel: string;
//     coverType: string[];
//     productDescription: string;
//     productPrice: number;
//     productImage: string;
//     productCategory: string;
//     createdAt: string;
//     updatedAt: string;
//   };
//   brandName: string;
//   phoneModel: string;
//   coverType: string;
//   quantity: number;
//   cartDate: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // Define the props type for Cart component
// interface CartProps {
//   clientId: string;
// }

// export default function Cart({ clientId }: CartProps) {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   // const fetchUserData = async () => {
//   //   if(isLoggedIn){
//   //     try {
//   //       setLoading(true);
//   //       const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/client/data`, {
//   //         method: 'GET',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           // 'Authorization': `Bearer ${user._id}`, // Send user ID in header
//   //         },
//   //         credentials: 'include', // Ensure cookies are sent along with the request
//   //       });
    
//   //       if (!response.ok) {
//   //         throw new Error(`Error: ${response.statusText}`);
//   //       }
    
//   //       const data = await response.json();
//   //       if (data.success) {
//   //         console.log(data.data);
//   //         setUser(data.data); // Update user data in context
//   //       } else {
//   //         console.log('Error:', data.error);
//   //       }
//   //     } catch (error) {
//   //       console.error('Failed to fetch user data:', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }else{
//   //     toast.warning("No products in cart")
//   //   }
//   // };
  
//   // useEffect(() => {
//   //   fetchUserData();
//   // }, [isLoggedIn]);
  
//   // const fetchCartDetails = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const fetchData = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/get/${clientId}`, {
//   //       method: 'GET',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         'Authorization': `Bearer ${clientId}`,
//   //       },
//   //       credentials: 'include',
//   //     });
      
//   //     const data = await fetchData.json();
    
//   //     if (data.success) {
//   //       setItems(data.data);
//   //     } else {
//   //       toast.error(data.message || "Failed to fetch cart details");
//   //     }
//   //   } catch (error) {
//   //     toast.error("Something went wrong");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
  

//   useEffect(() => {
//     const fetchCartDetails = async () => {
//       setLoading(true);
//       try {
//         const fetchData = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/get/${clientId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${clientId}`,
//           },
//           credentials: 'include',
//         });
        
//         const data = await fetchData.json();
      
//         if (data.success) {
//           setItems(data.data);
//         } else {
//           toast.error(data.message || "Failed to fetch cart details");
//         }
//       } catch (error) {
//         toast.error("Something went wrong", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCartDetails();
//   }, [clientId]);

//   const handleDeleteItem = async (itemId: string) => {
//     const clientId = Cookies.get("accessToken"); 
//     if (!clientId) {
//       toast.error("Client ID not found!");
//       return;
//     }
    
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/delete-cart/${itemId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${clientId}`,
//         },
//         credentials: 'include',
//       });
//       const data = await response.json();
//       if (data.success) {
//         setItems((prevItems) => prevItems.filter(item => item._id !== itemId));
//         toast.success('Item removed successfully');
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error('Failed to remove item');
//     }
//   };

//   const getTotalPrice = () => {
//     return items.reduce((total, item) => total + item.productId.productPrice * item.quantity, 0);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 mt-20">
//       {/* Header */}

//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Cart Items Section */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg shadow-sm border p-4">
//             <div className="p-4 border-b flex items-center">
//               <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600" />
//               <span className="ml-3 text-sm font-medium">SELECT ALL ({items.length} ITEMS)</span>
//               <button className="ml-auto flex items-center text-sm text-gray-500">
//                 <Trash2 size={16} />
//                 <span className="ml-1">DELETE</span>
//               </button>
//             </div>
//             {/* Cart Items */}
//             {loading ? (
//               <div className="p-4 text-center text-gray-500">Loading cart items...</div>
//             ) : items.length === 0  ? (
//               <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
//             ) : (
//               <div>
//                 {items.map((item) => (
//                   <div key={item._id} className="flex justify-between items-center py-4 border-b">
//                     <div className="flex items-center gap-4">
//                       <Image width={60} height={60} src={item.productId.productImage} alt={item.productId.productName} className="w-16 h-16 object-cover" />
//                       <div>
//                         <p className="font-medium">{item.productId.productName}</p>
//                         <p className="text-sm text-gray-500">{item.phoneModel} - {item.coverType}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <span>{item.quantity} x Rs. {item.productId.productPrice}</span>
//                       <button
//                         onClick={() => handleDeleteItem(item._id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Order Summary Section */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
//             <h2 className="text-lg font-medium mb-4">Order Summary</h2>

//             {/* Location */}
//            {/* Customer Information */}
//         <div className="mb-4">
//           <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Information</h3>
//           <form className="space-y-3">
//             {/* Phone Number */}
//             <div>
//               <label htmlFor="phoneNumber" className="block text-xs text-gray-500 mb-1">Phone Number</label>
//               <input 
//                 type="tel" 
//                 id="phoneNumber" 
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
//                 placeholder="Enter your phone number"
//                 required
//               />
//             </div>
            
//             {/* Pickup Address */}
//             <div>
//               <label htmlFor="pickupAddress" className="block text-xs text-gray-500 mb-1">Pickup Address</label>
//               <textarea 
//                 id="pickupAddress" 
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
//                 placeholder="Enter pickup address"
//                 rows={2}
//               />
//             </div>
            
//             {/* Delivery Address */}
//             <div>
//               <label htmlFor="deliveryAddress" className="block text-xs text-gray-500 mb-1">Delivery Address</label>
//               <textarea 
//                 id="deliveryAddress" 
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
//                 placeholder="Enter delivery address"
//                 rows={2}
//                 required
//               />
//             </div>
            
//             {/* Same as pickup checkbox */}
//             <div className="flex items-center">
//               <input 
//                 type="checkbox" 
//                 id="sameAsPickup" 
//                 className="h-4 w-4 rounded border-gray-300 text-blue-600" 
//               />
//               <label htmlFor="sameAsPickup" className="ml-2 text-xs text-gray-600">
//                 Same as pickup address
//               </label>
//             </div>
//             </form>
//           </div>

//             {/* Summary Calculations */}
//             <div className="border-t pt-4">
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-600">Subtotal ({items.length} items)</span>
//                 <span>Rs. {getTotalPrice()}</span>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <span className="text-gray-600">Shipping Fee</span>
//                 <span>Rs. 0</span>
//               </div>

//               {/* Voucher Code */}
//               <div className="mb-4 flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter Voucher Code"
//                   className="border rounded-md px-3 py-2 text-sm flex-1"
//                 />
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
//                   APPLY
//                 </button>
//               </div>

//               {/* Total */}
//               <div className="flex justify-between items-center border-t pt-4">
//                 <span className="font-medium">Total</span>
//                 <span className="text-xl font-medium text-orange-500">Rs. {getTotalPrice()}</span>
//               </div>

//               {/* Checkout Button */}
//               <button
//                 className="mt-4 w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 cursor-pointer transition-colors"
//                 disabled={items.length === 0}
//               >
//                 PROCEED TO CHECKOUT ({items.length})
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client"
// import React, { FormEvent, useEffect, useState } from 'react';
// import { Trash2, MapPin } from 'lucide-react';
// import Cookies from "js-cookie";
// import { toast } from 'sonner';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';


// export interface CartItem {
//   _id: string;
//   clientId: string;
//   productId: {
//     _id: string;
//     productName: string;
//     brands: string;
//     phoneModel: string;
//     coverType: string[];
//     productDescription: string;
//     productPrice: number;
//     productImage: string;
//     productCategory: string;
//     createdAt: string;
//     updatedAt: string;
//   };
//   brandName: string;
//   phoneModel: string;
//   coverType: string;
//   quantity: number;
//   cartDate: string;
//   createdAt: string;
//   updatedAt: string;
//   selected?: boolean; // New property to track selection state
// }

// // Define the props type for Cart component
// interface CartProps {
//   clientId: string;
// }

// export default function Cart({ clientId }: CartProps) {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [number, setNumber] = useState("")
//   const [total, setTotal] = useState(0)
//   const [pickupAddress, setPickupAddress] = useState("")
//   const [deliveryAddress, setDeliveryAddress] = useState("")
//   const [promoCode,setPromoCode] = useState("")
//   const router = useRouter();  // Initialize router


//   const fetchCartDetails = async () => {
//     setLoading(true);
//     try {
//         const fetchData = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/get/${clientId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${clientId}`,
//             },
//             credentials: 'include',
//         });
        
//         const data = await fetchData.json();
      
//         if (data.success) {
//             const itemsWithSelection = data.data.map(item => ({
//                 ...item,
//                 selected: false // Reset selection
//             }));
//             setItems(itemsWithSelection);
//         } else {
//             toast.error(data.message || "Failed to fetch cart details");
//         }
//     } catch (error) {
//         toast.error("Something went wrong");
//     } finally {
//         setLoading(false);
//     }
// };

// // Call `fetchCartDetails` in useEffect when clientId changes
// useEffect(() => {
//     fetchCartDetails();
// }, [clientId]);


//   const handleDeleteItem = async (itemId: string) => {
//     const clientId = Cookies.get("accessToken"); 
//     if (!clientId) {
//       toast.error("Client ID not found!");
//       return;
//     }
    
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/delete-cart/${itemId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${clientId}`,
//         },
//         credentials: 'include',
//       });
//       const data = await response.json();
//       if (data.success) {
//         setItems((prevItems) => prevItems.filter(item => item._id !== itemId));
//         // Also remove from selected items if it was selected
//         setSelectedItems(prev => prev.filter(id => id !== itemId));
//         toast.success('Item removed successfully');
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Failed to remove item');
//     }
//   };

//   // Handle selecting/deselecting individual item
//   const toggleSelectItem = (itemId: string) => {
//     setItems(prevItems => 
//       prevItems.map(item => 
//         item._id === itemId 
//           ? { ...item, selected: !item.selected } 
//           : item
//       )
//     );
    
//     setSelectedItems(prev => {
//       if (prev.includes(itemId)) {
//         return prev.filter(id => id !== itemId);
//       } else {
//         return [...prev, itemId];
//       }
//     });

//     // Update allSelected state based on new selection
//     const updatedItems = items.map(item => 
//       item._id === itemId ? { ...item, selected: !item.selected } : item
//     );
//     const allItemsSelected = updatedItems.every(item => item.selected);
//     setAllSelected(allItemsSelected);
//   };

//   // Handle select all / deselect all
//   const toggleSelectAll = () => {
//     const newSelectAllState = !allSelected;
//     setAllSelected(newSelectAllState);
    
//     const updatedItems = items.map(item => ({
//       ...item,
//       selected: newSelectAllState
//     }));
    
//     setItems(updatedItems);
    
//     if (newSelectAllState) {
//       setSelectedItems(items.map(item => item._id));
//     } else {
//       setSelectedItems([]);
//     }
//   };




// const handleOrderPlacement = async (e?: FormEvent) => {
//   if (e) e.preventDefault(); // Prevent default only if event is provided
//   setLoading(true);

//   try {
//     const addShippingData = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/add-order`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         clientId,
//         pickUpAddress: pickupAddress,
//         deliveryAddress,
//         promoCode,
//         totalPrice: total,
//         cartId: [...selectedItems],
//         number: number || "",
//         paymentMethod: "Khalti",
//       }),
//     });

//     const data = await addShippingData.json();
//     console.log("Response:", data);

//     if (data.success) {
//       toast.success("Order placed successfully!");
//       router.push(`/payment?orderId=${data.orderId}&total=${total}`);
//     }

//     return data; // Ensure function returns API response
//   } catch (error) {
//     console.error("Error in API request:", error);
//     toast.error("Failed to place order.");
//     return { success: false }; // Return failure response
//   } finally {
//     setLoading(false);
//   }
// };

// const handleProceedToPayment = async () => {
//   try {
//     const response = await handleOrderPlacement(); // Call without event argument

//     if (response?.success) {
//       router.push("/payment");
//     } else {
//       alert("Payment initiation failed. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error processing payment:", error);
//   }
// };


// return <button onClick={handleProceedToPayment}>Proceed to Payment</button>;
// };
//   // Delete all selected items
//   const deleteSelectedItems = async () => {
//     if (selectedItems.length === 0) {
//       toast.info("No items selected");
//       return;
//     }

//     const clientId = Cookies.get("accessToken");
//     if (!clientId) {
//       toast.error("Client ID not found!");
//       return;
//     }

//     // We'll use Promise.all to handle multiple delete requests
//     try {
//       const deletePromises = selectedItems.map(itemId => 
//         fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/delete-cart/${itemId}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${clientId}`,
//           },
//           credentials: 'include',
//         }).then(res => res.json())
//       );

//       const results = await Promise.all(deletePromises);
//       const allSuccessful = results.every(result => result.success);

//       if (allSuccessful) {
//         // Remove all deleted items from state
//         setItems(prevItems => prevItems.filter(item => !selectedItems.includes(item._id)));
//         setSelectedItems([]);
//         toast.success(`${selectedItems.length} items removed successfully`);
//       } else {
//         toast.error("Some items couldn't be removed");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to remove selected items");
//     }
//   };

//   const getTotalPrice = () => {
//     // Calculate total based on selected items only
//     if (selectedItems.length === 0) {
//       return 0; // If no items selected, show zero
//     }
    
//     return items
//       .filter(item => selectedItems.includes(item._id))
//       .reduce((total, item) => total + item.productId.productPrice * item.quantity, 0);
//   };
//   const getSelectedItemsCount = () => {
//     return selectedItems.length;
//   };

//   useEffect(() => {
//     setTotal(
//       items
//         .filter(item => selectedItems.includes(item._id))
//         .reduce((total, item) => total + item.productId.productPrice * item.quantity, 0)
//     );
//   }, [items, selectedItems]); // Runs only when `items` or `selectedItems` change
  

//   return (
//     <div className="min-h-screen bg-gray-50 mt-20">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Cart Items Section */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg shadow-sm border p-4">
//             <div className="p-4 border-b flex items-center">
//               <input 
//                 type="checkbox" 
//                 className="h-5 w-5 rounded border-gray-300 text-blue-600"
//                 checked={allSelected && items.length > 0}
//                 onChange={toggleSelectAll}
//               />
//               <span className="ml-3 text-sm font-medium">
//                 SELECT ALL ({items.length} ITEMS)
//               </span>
//               <button 
//                 className="ml-auto flex items-center text-sm text-gray-500"
//                 onClick={deleteSelectedItems}
//                 disabled={selectedItems.length === 0}
//               >
//                 <Trash2 size={16} />
//                 <span className="ml-1">DELETE ({getSelectedItemsCount()})</span>
//               </button>
//             </div>
//             {/* Cart Items */}
//             {loading ? (
//               <div className="p-4 text-center text-gray-500">Loading cart items...</div>
//             ) : items.length === 0  ? (
//               <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
//             ) : (
//               <div>
//                 {items.map((item) => (
//                   <div key={item._id} className="flex justify-between items-center py-4 border-b">
//                     <div className="flex items-center gap-4">
//                       <input 
//                         type="checkbox" 
//                         className="h-5 w-5 rounded border-gray-300 text-blue-600"
//                         checked={item.selected || false}
//                         onChange={() => toggleSelectItem(item._id)}
//                       />
//                       <Image width={60} height={60} src={item.productId.productImage} alt={item.productId.productName} className="w-16 h-16 object-cover" />
//                       <div>
//                         <p className="font-medium">{item.productId.productName}</p>
//                         <p className="text-sm text-gray-500">{item.phoneModel} - {item.coverType}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <span>{item.quantity} x Rs. {item.productId.productPrice}</span>
//                       <button
//                         onClick={() => handleDeleteItem(item._id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Order Summary Section */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
//             <h2 className="text-lg font-medium mb-4">Order Summary</h2>

//             {/* Customer Information */}
//             <div className="mb-4">
//               <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Information</h3>
//               <form className="space-y-3">
//                 {/* Phone Number */}
//                 <div>
//                   <label htmlFor="phoneNumber" className="block text-xs text-gray-500 mb-1">Phone Number</label>
//                   <input 
//                     type="tel" 
//                     value={number}
//                     onChange={(e) => setNumber(e.target.value)}
//                     id="phoneNumber" 
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
//                     placeholder="Enter your phone number"
//                     required
//                   />
//                 </div>
                
//                 {/* Pickup Address */}
//                 <div>
//                   <label htmlFor="pickupAddress" className="block text-xs text-gray-500 mb-1">Pickup Address</label>
//                   <textarea 
//                     id="pickupAddress" 
//                     value={pickupAddress}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
//                     placeholder="Enter pickup address"
//                     onChange={(e)=>setPickupAddress(e.target.value)}
//                     rows={2}
//                   />
//                 </div>
                
//                 {/* Delivery Address */}
//                 <div>
//                   <label htmlFor="deliveryAddress" className="block text-xs text-gray-500 mb-1">Delivery Address</label>
//                   <textarea 
//                     id="deliveryAddress" 
//                     value={deliveryAddress}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
//                     placeholder="Enter delivery address"
//                     onChange={(e)=>setDeliveryAddress(e.target.value)}
//                     rows={2}
//                     required
//                   />
//                 </div>
//               </form>
//             </div>
            
//             {/* Summary Calculations */}
//             <div className="border-t pt-4">
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-600">Subtotal ({getSelectedItemsCount()} items)</span>
//                 <span>Rs. {getTotalPrice()}</span>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <span className="text-gray-600">Shipping Fee</span>
//                 <span>Rs. 0</span>
//               </div>

//               {/* Voucher Code */}
//               <div className="mb-4 flex gap-2">
//                 <input
//                   type="text"
//                   value={promoCode}
//                   onChange={(e)=>setPromoCode(e.target.value)}
//                   placeholder="Enter Voucher Code"
//                   className="border rounded-md px-3 py-2 text-sm flex-1"
//                 />
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
//                   APPLY
//                 </button>
//               </div>

//               {/* Total */}
//               <div className="flex justify-between items-center border-t pt-4">
//                 <span className="font-medium">Total</span>
//                 <span className="text-xl font-medium text-orange-500">Rs. {getTotalPrice()}</span>
//               </div>

//               {/* Checkout Button */}
//               {/* <button
//                 className="mt-4 w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                 disabled={getSelectedItemsCount() === 0}
//                 onClick={response}
//               >
//                 PROCEED TO CHECKOUT ({getSelectedItemsCount()})
//               </button> */}
//               <button
//                 className="mt-4 w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                 disabled={getSelectedItemsCount() === 0}
//                 onClick={handleProceedToPayment} // Change response to handleProceedToPayment
//               >
//                 PROCEED TO CHECKOUT ({getSelectedItemsCount()})
//               </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








"use client"
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Trash2, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';
import { CartContext } from '@/provider/CartContext';
import Link from 'next/link';


export interface CartItem {
  _id: string;
  clientId: string;
  productId: {
    _id: string;
    productName: string;
    brands: string;
    phoneModel: string;
    coverType: string[];
    productDescription: string;
    productPrice: number;
    productImage: string;
    productCategory: string;
    createdAt: string;
    updatedAt: string;
  };
  brandName: string;
  phoneModel: string;
  coverType: string;
  quantity: number;
  cartDate: string;
  createdAt: string;
  updatedAt: string;
  selected?: boolean; // New property to track selection state
}

export interface IOrder {
  _id: string;
  clientId: string;
  productId: {
    product: string;
    quantity: number;
  }[];
  cartId: string[];
  number: number;
  pickUpAddress: string;
  deliveryAddress: string;
  totalQuantity: number;
  orderDate?: string; // ISO date string
  orderStatus: "pending" | "picked up" | "sent for delivery" | "delivered";
  paymentMethod: "Khalti" | "COD";
  paymentStatus: "pending" | "paid" | "failed";
  totalPrice: number;
  createdAt?: string; // Timestamps
  updatedAt?: string;
}

// Define the props type for Cart component
interface CartProps {
  clientId: string;
}

export default function Cart({ clientId }: CartProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [number, setNumber] = useState("")
  const [total, setTotal] = useState(0)
  const [pickupAddress, setPickupAddress] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [promoCode,setPromoCode] = useState("")
  const [oderData, setOrderData] = useState<IOrder[]>([]);
  const router = useRouter();  // Initialize router
  const {setIsCart} = useContext(CartContext)!


  const fetchCartDetails = async () => {
    setLoading(true);
    try {
        const fetchData = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/get/${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${clientId}`,
            },
            credentials: 'include',
        });
        
        const data = await fetchData.json();
      
        if (data.success) {
            const itemsWithSelection = data.data.map(item => ({
                ...item,
                selected: false // Reset selection
            }));
            setItems(itemsWithSelection);
        } else {
            toast.error(data.message || "Failed to fetch cart details");
        }
    } catch (error) {
        toast.error("Something went wrong");
    } finally {
        setLoading(false);
    }
};

// Call `fetchCartDetails` in useEffect when clientId changes
useEffect(() => {
    fetchCartDetails();
}, [clientId]);


const handleOrderPlacement = async (e?: FormEvent) => {
  if (e) e.preventDefault();

  if (!number || !deliveryAddress ||  !pickupAddress) {
    toast.error("Please fill in required delivery information");
    return { success: false };
  }

  if (selectedItems.length === 0) {
    toast.error("Please select items to order");
    return { success: false };
  }

  setLoading(true);

  try {
    const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/add-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        pickUpAddress: pickupAddress,
        deliveryAddress,
        promoCode,
        totalPrice: total,
        cartId: [...selectedItems],
        number: number,
        paymentMethod: "",
      }),
    });

    const data = await orderResponse.json();
    console.log("Order API Response:", data); // Debugging log

    if (data.success) {
      router.push(`/payment?orderId=${data.data._id}&total=${total}`);
      setOrderData(data.data)
      setPickupAddress("")
      setNumber("");
      setDeliveryAddress("");
      setSelectedItems([]);
      setPromoCode("");
      setTotal(0);
      setLoading(false);
      toast.success("Order placed successfully");
      return { success: true };
    } else {
      toast.error( "Failed to place order");
      return { success: false };
    }
  } catch (error) {
    console.error("Error in API request:", error);
    toast.error("Failed to place order. Please try again.");
    return { success: false };
  } finally {
    setLoading(false);
  }
};



  const handleDeleteItem = async (itemId: string) => {; 
    if (!clientId) {
      toast.error("Client ID not found!");
      return;
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/delete-cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${clientId}`,
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setItems((prevItems) => prevItems.filter(item => item._id !== itemId));
        // Also remove from selected items if it was selected
        setSelectedItems(prev => prev.filter(id => id !== itemId));
        setIsCart(false)
        toast.success('Item removed successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove item');
    }
  };

  // Handle selecting/deselecting individual item
  const toggleSelectItem = (itemId: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId 
          ? { ...item, selected: !item.selected } 
          : item
      )
    );
    
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });

    // Update allSelected state based on new selection
    const updatedItems = items.map(item => 
      item._id === itemId ? { ...item, selected: !item.selected } : item
    );
    const allItemsSelected = updatedItems.every(item => item.selected);
    setAllSelected(allItemsSelected);
  };

  // Handle select all / deselect all
  const toggleSelectAll = () => {
    const newSelectAllState = !allSelected;
    setAllSelected(newSelectAllState);
    
    const updatedItems = items.map(item => ({
      ...item,
      selected: newSelectAllState
    }));
    
    setItems(updatedItems);
    
    if (newSelectAllState) {
      setSelectedItems(items.map(item => item._id));
    } else {
      setSelectedItems([]);
    }
  };

// const handleProceedToPayment = async () => {
//   try {
//     const response = await handleOrderPlacement(); // Call without event argument

//     if (response?.success) {
//       router.push("/payment");
//     } else {
//       toast.error("Payment initiation failed. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error processing payment:", error);
//   }
// };

  // Delete all selected items
  const deleteSelectedItems = async () => {
    if (selectedItems.length === 0) {
      toast.info("No items selected");
      return;
    }

    if (!clientId) {
      toast.error("Client ID not found!");
      return;
    }

    // We'll use Promise.all to handle multiple delete requests
    try {
      const deletePromises = selectedItems.map(itemId => 
        fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/delete-cart/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${clientId}`,
          },
          credentials: 'include',
        }).then(res => res.json())
      );

      const results = await Promise.all(deletePromises);
      const allSuccessful = results.every(result => result.success);

      if (allSuccessful) {
        // Remove all deleted items from state
        setItems(prevItems => prevItems.filter(item => !selectedItems.includes(item._id)));
        setSelectedItems([]);
        toast.success(`${selectedItems.length} items removed successfully`);
      } else {
        toast.error("Some items couldn't be removed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove selected items");
    }
  };

const getTotalPrice = () => {
    // Calculate total based on selected items only
    if (selectedItems.length === 0) {
      return 0; // If no items selected, show zero
    }
    
    return items
      .filter(item => selectedItems.includes(item._id))
      .reduce((total, item) => total + item.productId.productPrice * item.quantity, 0);
  };


  const getSelectedItemsCount = () => {
    return selectedItems.length;
  };

  useEffect(() => {
    setTotal(
      items
        .filter(item => selectedItems.includes(item._id))
        .reduce((total, item) => total + item.productId.productPrice * item.quantity, 0)
    );
  }, [items, selectedItems]); // Runs only when `items` or `selectedItems` change
  

  return (
    <div className="min-h-screen bg-gray-50 py-5 mt-20">
      <div className="max-w-7xl mx-auto">
      <Breadcrumb className="mb-8">
       <BreadcrumbList className="bg-white shadow-sm rounded-full px-6 py-2">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
                  {/* <BreadcrumbItem>
                    <BreadcrumbPage>{product.productName}</BreadcrumbPage>
                  </BreadcrumbItem> */}
                </BreadcrumbList>
              </Breadcrumb>       
      </div>
         
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="p-4 border-b flex items-center">
              <input 
                type="checkbox" 
                className="h-5 w-5 rounded border-gray-300 text-blue-600"
                checked={allSelected && items.length > 0}
                onChange={toggleSelectAll}
              />
              <span className="ml-3 text-sm font-medium">
                SELECT ALL ({items.length} ITEMS)
              </span>
              <button 
                className="ml-auto flex items-center text-sm text-gray-500"
                onClick={deleteSelectedItems}
                disabled={selectedItems.length === 0}
              >
                <Trash2 size={16} />
                <span className="ml-1">DELETE ({getSelectedItemsCount()})</span>
              </button>
            </div>
            {/* Cart Items */}
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading cart items...</div>
            ) : items.length === 0  ? (
              <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
            ) : (
              <div>
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center py-4 border-b">
                    <div className="flex items-center gap-4">
                      <input 
                        type="checkbox" 
                        className="h-5 w-5 rounded border-gray-300 text-blue-600"
                        checked={item.selected || false}
                        onChange={() => toggleSelectItem(item._id)}
                      />
                      <Link href={`/products/${item.productId.productCategory}/${item.productId._id}`}>
                      <Image width={60} height={60} src={item.productId.productImage} alt={item.productId.productName} className="w-16 h-16 object-cover" />
                      </Link>
                      <div>
                        <p className="font-medium">{item.productId.productName}</p>
                        <p className="text-sm text-gray-500">{item.phoneModel} - {item.coverType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>{item.quantity} x Rs. {item.productId.productPrice}</span>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

            {/* Customer Information */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Information</h3>
              <form className="space-y-3">
                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs text-gray-500 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    id="phoneNumber" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                {/* Pickup Address */}
                <div>
                  <label htmlFor="pickupAddress" className="block text-xs text-gray-500 mb-1">Pickup Address</label>
                  <textarea 
                    id="pickupAddress" 
                    value={pickupAddress}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
                    placeholder="Enter pickup address"
                    onChange={(e)=>setPickupAddress(e.target.value)}
                    rows={2}
                  />
                </div>
                
                {/* Delivery Address */}
                <div>
                  <label htmlFor="deliveryAddress" className="block text-xs text-gray-500 mb-1">Delivery Address</label>
                  <textarea 
                    id="deliveryAddress" 
                    value={deliveryAddress}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
                    placeholder="Enter delivery address"
                    onChange={(e)=>setDeliveryAddress(e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </form>
            </div>
            
            {/* Summary Calculations */}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal ({getSelectedItemsCount()} items)</span>
                <span>Rs. {getTotalPrice()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping Fee</span>
                <span>Rs. 0</span>
              </div>

              {/* Voucher Code */}
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e)=>setPromoCode(e.target.value)}
                  placeholder="Enter Voucher Code"
                  className="border rounded-md px-3 py-2 text-sm flex-1"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                  APPLY
                </button>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-medium">Total</span>
                <span className="text-xl font-medium text-orange-500">Rs. {getTotalPrice()}</span>
              </div>

              {/* Checkout Button */}
              <button
                className="mt-4 w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={getSelectedItemsCount() === 0}
                onClick={handleOrderPlacement}
              >
                PROCEED TO CHECKOUT ({getSelectedItemsCount()})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}