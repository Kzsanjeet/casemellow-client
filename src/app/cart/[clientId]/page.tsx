"use client";

import Cart from "@/components/Cart/Cart";
import Nav from "@/components/Nav/Nav";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const params = useParams();
  // Ensure clientId is a string
  const clientId = Array.isArray(params?.clientId) ? params.clientId[0] : params?.clientId;

  // If clientId is undefined or not a valid string, you can redirect or handle the error
  if (!clientId) {
    return <div>Client ID is missing</div>;
  }

  return (
    <div className="w-full bg-white">
      <Nav />
      <Cart clientId={clientId} />
    </div>
  );
};

export default Page;
