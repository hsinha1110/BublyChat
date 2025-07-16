import React, { createContext, useState, useEffect, ReactNode } from "react";
import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types"; // Ensure correct import paths
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "@/services/authService";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateToken: (token: string) => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadUserData(); // Load user data on initial render
  }, []);

  // Function to load user data from AsyncStorage and check token validity
  const loadUserData = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken); // Decode JWT token

        // Check if the token has expired
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          AsyncStorage.removeItem("token"); // Remove expired token
          goToWelcomePage();
          return;
        }

        console.log("decoded user:", decoded.user);
        setUser(decoded.user); // Set the user
        goToHomePage();
      } catch (error) {
        console.error("Error decoding token:", error);
        goToWelcomePage();
        await AsyncStorage.removeItem("token");
      }
    } else {
      goToWelcomePage();
    }
  };
  const goToHomePage = () => {
    setTimeout(() => {
      router.replace("/(main)/home");
    }, 1500);
  };
  const goToWelcomePage = () => {
    setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 1500);
  };

  const updateToken = async (token: string) => {
    if (token) {
      setToken(token);
      await AsyncStorage.setItem("token", token);
      const decoded = jwtDecode<{ user: UserProps }>(token);
      console.log("decoded :", decoded.user);
      setUser(decoded.user);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      await updateToken(response.token);
      router.replace("/(main)/home" as any);
    } catch (error) {
      Alert.alert(
        "Login failed",
        "Please check your credentials and try again."
      );

      return;
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    avatar: string | null = null
  ) => {
    try {
      const response = await register(name, email, password, avatar);
      console.log("Response from signUp:", response);
      await updateToken(response.token);
      router.replace("/(auth)/login" as any);
    } catch (error) {
      Alert.alert("Signup failed", "Please check the details and try again.");
      return;
    }
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signUp,
        signOut,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
