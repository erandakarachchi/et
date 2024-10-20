import DashboardWrapper from "@/components/templates/DashboardWrapper";
import NavBar from "@/components/templates/NavBar";
import SideBar from "@/components/templates/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <DashboardWrapper />
      {children}
    </section>
  );
}
