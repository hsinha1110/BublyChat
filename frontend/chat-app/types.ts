import { TextInputProps, TextProps, TextStyle, ViewStyle } from "react-native";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { TextInput } from "react-native";

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
  isModal?: boolean;
  showPattern?: boolean;
  bgOpacity: number;
};

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children: React.ReactNode;
  style?: TextStyle;
  textProps?: TextProps;
};

export interface ButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
  children: React.ReactNode;
}
export type BackButtonProps = {
  style?: ViewStyle;
  color?: string;
  iconSize?: number;
};

export interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<TextInput>;
  label?: string;
  error?: string;
}
export interface DecodedTokenProps {
  user: UserProps;
  iat: number;
  exp: number;
}
// Define the UserProps type if not already defined
export type UserProps = {
  id: string;
  email: string;
  name: string;
  avatar?: string | null; // If you have an avatar
  // Add any other user-related properties here
  [key: string]: any; // Allows for additional dynamic properties if needed
};

// Define the AuthContextProps type
export type AuthContextProps = {
  token: string | null; // JWT token or null if not authenticated
  user: UserProps | null; // User details or null if not logged in
  signIn: (email: string, password: string) => Promise<void>; // Login method
  signUp: (
    email: string,
    password: string,
    name: string,
    avatar: string | null
  ) => Promise<void>; // Register method
  signOut: () => Promise<void>; // Sign out method
  updateToken: (token: string) => void; // Update token in the context
};
export interface DecodedTokenProps {
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
  user: UserProps; // Your user data
}
