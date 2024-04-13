import { getRoom } from "@/data-access/rooms";
import Link from "next/link";
import { Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TagsList } from "@/components/ui/tags-list";
import { splitTags } from "@/components/ui/tags-list";
import { DevLocater } from "./video-player";

export default async function RoomPage(props: { params: { roomid: string } }) {
  const roomId = props.params.roomid;
  const room = await getRoom(roomId);

  //This condition basically helps handle the case when room is undefined
  //with use of this i can simple access by writing room.name and not room?.name which was covering below condition earlier
  if (!room) {
    return <div>No room found with this ID</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
         <DevLocater room={room}/>
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex-col gap-4">
          <h1 className="text-base font-bold">{room.name}</h1>
          <p className="text-base text-gray-500">{room.description}</p>
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 mt-2 self-center text-sm"
              // Useed target and rel to open link in new tab
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              Github Repository
            </Link>
          )}
          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>
    </div>
  );
}
