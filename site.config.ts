import { CommitteeMember } from "types/committe";
import committee from "./committee.json";

const siteConfig = {
  blogDatabaseId: "a83071d8-1416-44a9-98cf-45638a583a82",
  eventsDatabaseId: "533a35ca-b69f-4a5d-add8-35c083eaa97e",
  commmittee: committee as CommitteeMember[],
  fundingUrl: "https://youtu.be/dQw4w9WgXcQ",
  primarySiteUrl: "https://emgineer.vercel.app",
  admins: ["ls914"],
};

export default siteConfig;
