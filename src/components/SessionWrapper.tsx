import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

export default async function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // async OK here

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
