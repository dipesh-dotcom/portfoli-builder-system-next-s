// app/(admin)/users/page.tsx
import { getUsers } from "@/actions/user";
import { UsersTable } from "@/components/admin/table/UsersTable";
import { Skeleton } from "@/components/ui/skeleton";

export default async function UsersPage() {
  const res = await getUsers();

  const users = res.data.map((user) => ({
    id: user.id,
    name: user.name || "No Name",
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-3 font-semibold">User Management</h1>
        <p className="text-muted-foreground">
          Manage all system users and their roles
        </p>
      </div>

      {users.length === 0 ? <TableSkeleton /> : <UsersTable users={users} />}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
      <Skeleton className="h-[500px] w-full" />
    </div>
  );
}
