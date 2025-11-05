"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales } from "../../next-intl";
import { useConfig } from "@lib/configProvider";

export function useChangeLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const { setLoading } = useConfig();

  // Keep currentPath updated
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const changeLocale = (targetLocale: string) => {
    const segments = currentPath.split("/").filter(Boolean);
    const firstSegment = segments[0] || "en";
    let pathWithoutLocale = segments;

    if (locales.includes(firstSegment as any)) {
      pathWithoutLocale = segments.slice(1);
    }

    const newPath = `/${targetLocale}${
      pathWithoutLocale.length ? "/" + pathWithoutLocale.join("/") : ""
    }`;

    if (currentPath !== newPath) {
      setLoading(true);
      router.push(newPath);
    }
  };

  return changeLocale;
}
