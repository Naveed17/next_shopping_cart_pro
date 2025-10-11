import { createContext, useContext } from "react";
import { LayoutType } from "@src/@types/theme";
import { CommonProps } from "@src/@types/common";

export interface LayoutContextProps {
  type: LayoutType;
}

export const LayoutContext = createContext<LayoutContextProps | undefined>(
  undefined
);

export const useLayout = (): LayoutContextProps => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

type LayoutBaseProps = CommonProps & LayoutContextProps;

const LayoutBase = (props: LayoutBaseProps) => {
  const {
    children,
    className,
    type,
  } = props;

  return (
    <LayoutContext.Provider value={{ type }}>
      <main className={className}>{children}</main>
    </LayoutContext.Provider>
  );
};

export { LayoutBase };
export default LayoutBase;
