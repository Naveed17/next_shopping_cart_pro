import * as React from "react";

import type { UserContextValue } from "@src/components/providers/user-context";
import { UserContext } from "@src/components/providers/user-context";

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
