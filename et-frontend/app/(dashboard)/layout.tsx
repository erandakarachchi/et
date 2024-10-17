import NavBar from "@/components/templates/NavBar";
import SideBar from "@/components/templates/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <NavBar />
      <SideBar />
      {children}
    </section>
  );
}
