"use client";
import React, { createContext, useContext } from "react";
import { useSession, signIn, signOut, signUp } from "@/lib/auth-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Better Auth react hook — gives us session, user, and loading state
  const { data: session, isPending: loading } = useSession();

  const user = session?.user ?? null;
  const isAuthenticated = !!user;

  // Sign up with email + password
  const register = async ({ name, email, password }) => {
    const res = await signUp.email({ name, email, password });
    return res;
  };

  // Sign in with email + password
  const login = async ({ email, password }) => {
    const res = await signIn.email({ email, password });
    return res;
  };

  // Google OAuth
  const loginWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/MyVn", // redirect here after Google login
    });
  };

  // Sign out
  const logout = async () => {
    await signOut();
  };

  const value = {
    user,
    session,
    loading,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Convenience hook
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
