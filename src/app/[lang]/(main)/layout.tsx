import { Main } from "@components/themes/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      {children}
    </Main>
  );
}