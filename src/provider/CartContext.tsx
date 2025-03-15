"use client"
import React, { createContext, FC, ReactNode, useState } from "react";

export interface ICart {
    _id: string; 
    clientId: string;
    productId: {
      _id: string;
      name: string;
      price: number;
      imageUrl: string;
    };
    brandName: string;
    phoneModel: string;
    coverType: string;
    quantity: number;
    cartDate?: string;
    createdAt?: string;
    updatedAt?: string;
  }
// Define context type
interface CartContextType {
  cart: ICart | null;
  setCart: (cart: ICart | null) => void;
}

// Create context with a default empty object
export const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
});

// Provider component
const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ICart | null>(null);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
