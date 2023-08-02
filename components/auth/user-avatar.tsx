import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import React from "react";
import { getServerAuthSession } from "server/auth";

const UserAvatar = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return <div>Not logged in</div>;
  }

  const name = session.user.name;
  const avatarUrl = session.user.image;
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];
  const initials = firstName[0] + lastName[0];

  return (
    <Avatar>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
