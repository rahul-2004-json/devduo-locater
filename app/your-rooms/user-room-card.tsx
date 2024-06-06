'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, PencilIcon, TrashIcon } from "lucide-react";
import { TagsList } from "@/components/ui/tags-list";
import { splitTags } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoomAction } from "./actions";





export function UserRoomCard({ room }: { room: Room }) {
  const tags = room.tags.split(",").map((tag) => tag.trim());
  return (
    <Card>
      <CardHeader className="relative">
       <Button className="absolute top-2 right-2" size="icon">
        <Link href={`/edit-room/${room.id}`}>
        <PencilIcon/>
        </Link>
       </Button>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            // Useed target and rel to open link in new tab
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            Github Repository
          </Link>
        )}
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

       

        <AlertDialog>
      <AlertDialogTrigger asChild> 
      <Button 
        variant="destructive"
        >
         <TrashIcon className="w-4 h-4 mr-2"/> Delete Rooms
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your room
        and remove your room data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
         onClick={()=>{
          //delete the room
          deleteRoomAction(room.id);
         }}
        >Delete</AlertDialogAction>
      </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

      </CardFooter>
    </Card>
  );
}