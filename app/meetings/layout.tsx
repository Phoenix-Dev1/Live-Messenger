import Sidebar from "../components/sidebar/Sidebar";

export default async function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  );
}
