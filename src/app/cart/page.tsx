"use client";

import Cart from "@/components/Cart/Cart";
import Nav from "@/components/Nav/Nav";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [userId, setUserId] = useState(null);
  // const params = useParams();
  // // Ensure clientId is a string
  // const clientId = Array.isArray(params?.clientId) ? params.clientId[0] : params?.clientId;
 
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedData = JSON.parse(userDetails);
      setUserId(parsedData._id);
    }
  }, []);

  // If clientId is undefined or not a valid string, you can redirect or handle the error
  if (!userId) {
    return <div>Client ID is missing</div>;
  }

  return (
    <div className="w-full bg-white">
      <Nav />
      <Cart clientId={userId} />
    </div>
  );
};

export default Page;
