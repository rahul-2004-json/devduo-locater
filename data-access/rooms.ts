import { db } from "@/db";
import { unstable_noStore } from "next/cache";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";

export async function getRooms(search: string | undefined) {
  unstable_noStore();
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  }
  );
  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
