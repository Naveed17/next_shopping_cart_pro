"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { useAppDispatch } from "@lib/redux/store";
import { setAppData } from "@lib/redux/appData";

// 1️⃣ Define the type for your context
export type Config = {
  direction: "ltr" | "rtl";
  locale: string;
  currency: string;
  mode: "light" | "dark";
  controlSize?: "default" | "compact";
  loading: boolean;
  setLoading: (v: boolean) => void;
  loadAppData: (locale: string) => Promise<void>;
};

// 2️⃣ Default values
export const defaultConfig: Config = {
  direction: "ltr",
  locale: "en",
  currency: "USD",
  mode: "light",
  controlSize: "default",
  loading: false,
  setLoading: () => {},
  loadAppData: async () => {},
};

export const ConfigContext = createContext<Config>(defaultConfig);
ConfigContext.displayName = "ConfigContext";

// 3️⃣ Provider Component
export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [locale, setLocale] = useState("en");
  const dispatch = useAppDispatch();

  // 4️⃣ Define the method you mentioned
  const loadAppData = useCallback(
    async (newLocale: string): Promise<void> => {
      setLoading(true);
      try {
        await dispatch(setAppData({ language: newLocale }));
        setLocale(newLocale);
      } catch (err) {
        console.error("Failed to load app data:", err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // 5️⃣ Final context value
  const value: Config = {
    direction: "ltr",
    locale,
    currency: "USD",
    mode: "light",
    controlSize: "default",
    loading,
    setLoading,
    loadAppData,
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

// 6️⃣ Hook for easy use
export function useConfig() {
  return useContext(ConfigContext);
}

export default ConfigProvider;