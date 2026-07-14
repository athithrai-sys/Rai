import Header from "@/components/layout/Header";

// Main browse screens share the persistent peach header
// (avatar / postcode / radius / cart). The listing detail page has its own
// slimmer "back" header, which is why it lives outside this route group.
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
