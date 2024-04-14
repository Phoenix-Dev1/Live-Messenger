import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} currentUser={currentUser!} />
        {children}
      </div>
    </Sidebar>
  );
}
