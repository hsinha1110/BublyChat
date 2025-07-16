import React from "react";
import AuthProvider from "@/context/authContext";
import { Stack } from "expo-router";

// StackLayout component
const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

// RootLayout component that wraps the StackLayout inside AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

export default RootLayout; // Only one default export
