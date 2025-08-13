// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthService from "../services/authService";
import { useRouter } from "expo-router"; // -> 1. Importe o useRouter

type Picture = {
  uri: string;
  name: string;
  type: string;
} | null;

type RegisterData = {
  name: string;
  email: string;
  course: string;
  password: string;
  confirmpassword: string;
  picture?: Picture;
};

type LoginData = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  picturePath?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  hasOnboarded: boolean | null; // ← adiciona aqui
  completeOnboarding: () => Promise<void>; // ← adiciona aqui
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login: loginService, register: registerService } = useAuthService();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadStorage() {
      const storedUser = await AsyncStorage.getItem("@user");
      const storedToken = await AsyncStorage.getItem("@token");
      const storedOnboarding = await AsyncStorage.getItem("@hasOnboarded");

      if (storedOnboarding) setHasOnboarded(true);
      else setHasOnboarded(false);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    }
    loadStorage();
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem("@hasOnboarded", "true");
    setHasOnboarded(true);
  }, []);

  const login = useCallback(
    async (data: LoginData) => {
      const result = await loginService(data);
      setUser(result.user);
      setToken(result.token);

      await AsyncStorage.setItem("@user", JSON.stringify(result.user));
      await AsyncStorage.setItem("@token", result.token);
    },
    [loginService]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      await registerService(data);
    },
    [registerService]
  );

  const router = useRouter();

  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@token");
      router.replace('/login'); // Use a rota correta para sua tela de login

    }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        hasOnboarded,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
