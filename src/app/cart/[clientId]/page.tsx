"use client";

import Cart from "@/components/Cart/Cart";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Page = () => {
    const params = useParams();
    const router = useRouter()
    const clientId = params.clientId as string; 

    if(!clientId){
        router.push("/cart")
    }
  
  return (
    <div className="w-full bg-white">
      <Nav />
      <Cart clientId={clientId} />
      <Footer/>
    </div>
  );
};

export default Page;
