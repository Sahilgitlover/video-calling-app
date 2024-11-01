"use client";
import { useSocket } from "@/context/SocketContext";
import { useUser } from "@clerk/nextjs";
import React from "react";
import Avatar from "./Avatar";
const ListOnlineUsers = () => {
  const { user } = useUser();
  const { onlineUsers,handleCall } = useSocket();
  return (
    <div className=" flex w-full items-center border-b pb-22 border-b-primary/10">
      {onlineUsers &&
        onlineUsers.map((getuser) => {
          if(getuser.profile.id === user?.id) return null;
          return (
            <div key={getuser.userId} onClick={() => handleCall(getuser)} className=" flex flex-col items-center gp-1 cursor-pointer">
              <Avatar src={getuser.profile.imageUrl} />
              <div className=" text-sm">{getuser.profile.fullName?.split(" ")[0]}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ListOnlineUsers;
