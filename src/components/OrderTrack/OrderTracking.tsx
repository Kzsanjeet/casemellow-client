'use client';

import React, { useState, useEffect } from "react";
import { Check, Clock, ShoppingBag, Truck, TruckIcon as TruckDelivery } from "lucide-react";
import { cn } from "@/lib/utils";


 export type OrderStatus = "pending" | "picked up" | "sent for delivery" | "delivered";


interface OrderTrackingProps {
    orderStatus?: OrderStatus;
  }

export default function OrderTracking({ orderStatus}: OrderTrackingProps) {
  const [status, setStatus] = useState<OrderStatus>(orderStatus);

  useEffect(() => {
    if (orderStatus) setStatus(orderStatus);
  }, [orderStatus]);

  const statuses = [
    {
      value: "pending",
      label: "Order Pending",
      icon: <Clock className="h-6 w-6" />,
      description: "We've received your order and are processing it.",
    },
    {
      value: "picked up",
      label: "Picked Up",
      icon: <ShoppingBag className="h-6 w-6" />,
      description: "Your package has been picked up and is on the move.",
    },
    {
      value: "sent for delivery",
      label: "Out for Delivery",
      icon: <Truck className="h-6 w-6" />,
      description: "Your package is out for delivery. It's almost there!",
    },
    {
      value: "delivered",
      label: "Delivered",
      icon: <TruckDelivery className="h-6 w-6" />,
      description: "Your order has been delivered successfully!",
    },
  ];

  const currentStatusIndex = statuses.findIndex((s) => s.value === status);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 bg-white rounded-2xl shadow-lg">
      {/* Animated Progress Bar */}
      <div className="relative mb-12">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-700 ease-in-out"
            style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
        {statuses.map((step, index) => {
          const isCompleted = index <= currentStatusIndex;
          const isCurrent = index === currentStatusIndex;

          return (
            <div key={step.value} className="flex flex-col items-center relative">
              {/* Circle Icon */}
              <div
                className={cn(
                  "flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300",
                  isCompleted
                    ? "border-green-400 bg-gradient-to-br from-green-400 to-green-500 text-white"
                    : "border-gray-300 bg-gray-100 text-gray-400"
                )}
                style={{ animation: isCurrent ? "bounce 1s infinite" : undefined }}
              >
                {isCompleted && index < currentStatusIndex ? <Check className="h-6 w-6" /> : step.icon}
              </div>

              {/* Line connecting the steps */}
              {index < statuses.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-24 h-1 bg-gray-300" />
              )}

              {/* Labels */}
              <div className="text-center mt-4">
                <h3 className={cn("text-sm font-semibold", isCurrent ? "text-blue-500" : isCompleted ? "text-green-500" : "text-gray-500")}>
                  {step.label}
                </h3>
                <p className="text-xs text-gray-400 mt-1 max-w-[120px]">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="mt-10 md:hidden">
        <div className="space-y-6">
          {statuses.map((step, index) => {
            const isCompleted = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;

            return (
              <div key={step.value} className="flex items-start space-x-4">
                <div
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full border-4",
                    isCompleted
                      ? "border-green-400 bg-gradient-to-br from-green-400 to-green-500 text-white"
                      : "border-gray-300 bg-gray-100 text-gray-400"
                  )}
                  style={{ animation: isCurrent ? "bounce 1s infinite" : undefined }}
                >
                  {isCompleted && index < currentStatusIndex ? <Check className="h-5 w-5" /> : step.icon}
                </div>
                <div>
                  <h4 className={cn("text-md font-semibold", isCurrent ? "text-blue-500" : isCompleted ? "text-green-500" : "text-gray-500")}>
                    {step.label}
                  </h4>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bouncing Animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
