import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { getRooms } from "@/data-access/rooms";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home() {
  //here we have one layer of abstraction as our front code doesn't know from where are data is coming , it just calls the function
  const rooms = await getRooms();
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
