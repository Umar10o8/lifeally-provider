"use client";

import React, { createContext, useContext } from "react";
//import { useTherapist } from "@/hooks/use-therapist";
//import { useAppointment } from "@/hooks/use-appointment";
//import { useSubscription } from "@/hooks/use-subscription";
//import { usePayment } from "@/hooks/use-payment";
//import { useUser } from "@/hooks/use-user";
//import { useReview } from "@/hooks/use-review";

// Create the services context
type ServicesContextType = {
 // therapist: ReturnType<typeof useTherapist>;
  //appointment: ReturnType<typeof useAppointment>;
  //subscription: ReturnType<typeof useSubscription>;
  //payment: ReturnType<typeof usePayment>;
  //user: ReturnType<typeof useUser>;
  //review: ReturnType<typeof useReview>;
};

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

// Services provider component
export function ServicesProvider({ children }: { children: React.ReactNode }) {
  // Initialize all service hooks
  //const therapist = useTherapist();
 // const appointment = useAppointment();
  //const subscription = useSubscription();
  //const payment = usePayment();
  //const user = useUser();
  //const review = useReview();

  // Create the context value
  const value = {
    //therapist,
   // appointment,
    //subscription,
    //payment,
    //user,
    //review,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}

// Hook to use the services context
export function useServices() {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
}

// Individual service hooks for convenience
//export function useTherapistService() {
  //const { therapist } = useServices();
  //return therapist;
//}

//export function useAppointmentService() {
  //const { appointment } = useServices();
  //return appointment;
//}

//export function useSubscriptionService() {
  //const { subscription } = useServices();
  //return subscription;
//}

//export function usePaymentService() {
  //const { payment } = useServices();
  //return payment;
//}

//export function useUserService() {
  //const { user } = useServices();
  //return user;
//}

//export function useReviewService() {
  //const { review } = useServices();
  //return review;
//} 