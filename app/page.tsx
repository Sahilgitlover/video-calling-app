import CallNotifications from "@/components/ui/CallNotifications";
import ListOnlineUsers from "@/components/ui/ListOnlineUsers";
import VideoCall from "@/components/ui/VideoCall";

export default function Home() {
  return (
    <div>
      <ListOnlineUsers />
      <CallNotifications />
      <VideoCall />
    </div>
  );
}