//this function can be envoked in the client side and run the server side backend code
"use server";
import { Room} from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { editRoom,getRoom } from "@/data-access/rooms";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room ,"userId">){
  const session = await getSession();

  if (!session) {
    throw new Error("You must be logged in to create this room");
  }

  const room=await getRoom(roomData.id);
    if(room?.userId !==session.user.id){
        throw new Error("User not authenticated");
  }

  await editRoom({...roomData, userId: room.userId });
 
  //Here revalidatePath clears the cache of the particular path and gives the fresh copy of everything when someone visits the given path
  revalidatePath("/your-rooms");
  revalidatePath(`/edit-room/${roomData.id}`);
  redirect("/your-rooms");
}


