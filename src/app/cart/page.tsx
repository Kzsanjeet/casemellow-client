"use client";

import Cart from "@/components/Cart/Cart";
import Nav from "@/components/Nav/Nav";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedData = JSON.parse(userDetails);
      setUserId(parsedData._id);
    }
  }, []);

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
