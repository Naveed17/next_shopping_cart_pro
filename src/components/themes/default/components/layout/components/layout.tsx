import type { CommonProps } from "@src/@types/common";
import LayoutBase from "@src/context/layoutContext";
import { LAYOUT_DEFAULT } from "@src/constants/theme.constant";
import { Footer, Header } from "@src/components/themes/default";

type DefaultProps = CommonProps;

const Default = ({ children }: DefaultProps) => {
  return (
    <LayoutBase
      type={LAYOUT_DEFAULT}
    >
      <Header />
      {children}
      {/* footer  */}
      <Footer />
    </LayoutBase>
  );
};

export default Default;
