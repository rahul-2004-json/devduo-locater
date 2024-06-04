'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
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



export function RoomCard({ room }: { room: Room }) {
  const tags = room.tags.split(",").map((tag) => tag.trim());
  return (
    <Card>
      <CardHeader>
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
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}