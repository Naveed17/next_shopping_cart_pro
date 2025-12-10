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

export type Config = {
  controlSize?: "default" | "compact";
  loading: boolean;
  setLoading: (v: boolean) => void;
  loadAppData: (locale?: string) => Promise<void>;
  direction: "ltr" | "rtl";
};

export const defaultConfig: Config = {
  loading: false,
  setLoading: () => {},
  loadAppData: async () => {},
  direction: "ltr",
};

export const ConfigContext = createContext<Config>(defaultConfig);
ConfigContext.displayName = "ConfigContext";

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("localeChanging") === "true";
    }
    return false;
  });
  const { locale } = useLocale();
  const dispatch = useAppDispatch();
  const direction = useAppSelector((state) => state.root.direction);

  const loadAppData = useCallback(
    async (requestedLocale?: string): Promise<void> => {
      setLoading(true);
      try {
        await dispatch(setAppData({ language: requestedLocale ?? locale }));
      } catch (err) {
        console.error("Failed to load app data:", err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, locale]
  );

  const mode = useAppSelector((state) => state.root.mode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  }, [mode]);

  useEffect(() => {
    loadAppData();
  }, [loadAppData]);

  const value: Config = {
    loading,
    setLoading,
    loadAppData,
    direction,
  };

  return React.createElement(ConfigContext.Provider, { value }, children);
}

export function useConfig() {
  return useContext(ConfigContext);
}

export default ConfigProvider;
