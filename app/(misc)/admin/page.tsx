import { Title } from "components/text";
import { FC } from "react";
import { getServerAuthSession } from "server/auth";
import siteConfig from "site.config";
import RevalidateButton from "./_components/revalidate-button";

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = async ({}) => {
  const session = await getServerAuthSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const crsid = session.user.email.split("@")[0];

  if (!siteConfig.admins.includes(crsid)) {
    throw new Error("Unauthorized");
  }

  return (
    <main className="flex flex-col items-center justify-center p-12">
      <Title>Admin Page</Title>
      <RevalidateButton />
    </main>
  );
};

export default AdminPage;
