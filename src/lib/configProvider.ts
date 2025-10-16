"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { setAppData } from "@lib/redux/appData";
import useLocale from "@hooks/useLocale";

// 1️⃣ Define the type for your context
export type Config = {
  controlSize?: "default" | "compact";
  loading: boolean;
  setLoading: (v: boolean) => void;
  loadAppData: (locale: string) => Promise<void>;
};

// 2️⃣ Default values
export const defaultConfig: Config = {
  loading: false,
  setLoading: () => {},
  loadAppData: async () => {},
};

export const ConfigContext = createContext<Config>(defaultConfig);
ConfigContext.displayName = "ConfigContext";

// 3️⃣ Provider Component
export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const { locale } = useLocale();
  const dispatch = useAppDispatch();

  // 4️⃣ Define the method you mentioned
  const loadAppData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await dispatch(setAppData({ language: locale }));
    } catch (err) {
      console.error("Failed to load app data:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, locale]);
  
  const mode = useAppSelector((state) => state.root.mode);
  
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  }, [mode]);

  // Auto-load app data when provider mounts or locale changes
  useEffect(() => {
    loadAppData();
  }, [loadAppData]);

  // 5️⃣ Final context value
  const value: Config = {
    loading,
    setLoading,
    loadAppData,
  };

  return React.createElement(ConfigContext.Provider, { value }, children);
}

// 6️⃣ Hook for easy use
export function useConfig() {
  return useContext(ConfigContext);
}

export default ConfigProvider;
