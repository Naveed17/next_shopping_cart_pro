"use server";
import { createSession, getSession, logout } from "@lib/auth/session";
import { siteUrl } from "./actions";

export const fetchAppData = async (payload: {
  language: string;
  currency: string;
}) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${siteUrl}/api/mock/app`, {
      method: "POST",
      body: JSON.stringify({
        language: payload?.language,
        currency: payload?.currency,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const fetchProducts = async (payload: {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${siteUrl}/api/mock/products`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const fetchCategories = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${siteUrl}/api/mock/categories`, {
      method: "GET",
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const addToCart = async (payload: {
  productId: string;
  quantity: number;
  variant?: string;
}) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${siteUrl}/api/mock/cart/add`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const updateCartItem = async (payload: {
  itemId: string;
  quantity: number;
}) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${siteUrl}/api/mock/cart/update`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const removeFromCart = async (itemId: string) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${siteUrl}/api/mock/cart/remove`, {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const getCart = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${siteUrl}/api/mock/cart`, {
      method: "GET",
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const createOrder = async (payload: {
  items: Array<{ productId: string; quantity: number; price: number }>;
  shippingAddress: any;
  paymentMethod: string;
}) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    
    const response = await fetch(`${siteUrl}/api/mock/orders/create`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const getOrders = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${siteUrl}/api/mock/orders`, {
      method: "GET",
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const newsLetter = async ({
  name = "subscriber",
  email,
}: {
  email: string;
  name?: string;
}) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${siteUrl}/api/mock/newsletter`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const sign_up = async (payload: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      formData.append(key, String(value));
    } else if (typeof value === "string") {
      formData.append(key, value);
    }
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${siteUrl}/api/mock/auth/signup`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const signIn = async (payload: { email: string; password: string }) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${siteUrl}/api/mock/auth/login`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }
    await createSession(data?.data);
    return { success: "Logged in successfully" };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const signOut = async () => {
  try {
    await logout();
    return { success: "Logged out successfully" };
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
};

export const forget_password = async (email: string) => {
  const formData = new FormData();
  formData.append("email", email);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(`${siteUrl}/api/mock/auth/forgot`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { error: "Request timeout - please try again" };
    }
    return { error: (error as Error).message || "An error occurred" };
  }
};