import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "./room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";


export default async function Home({searchParams}:{searchParams:{search: string}}) {
  // console.log(searchParams.search);
  //here we have one layer of abstraction as our front code doesn't know from where are data is coming , it just calls the function
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
      <SearchBar />
      </div>
    
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>

      {rooms.length === 0 && (
        <div className="flex flex-col gap-5 justify-center items-center mt-24 ">
         <Image 
         src="/no_data.svg" 
         alt="no data image"
         width="200"
         height="200"
         />
         <h2 className="text-2xl">Oops! No rooms yet</h2>
         <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
        </div>
      )}
    </main>
  );
}
