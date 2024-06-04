"use client"

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { badgeVariants } from "./badge";


export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap mt-4">
      {tags.map((tag) => (
        <button  
        onClick={() => {
          router.push(`/?search=${tag}`);
        }}  
        key={tag}
        className={cn(badgeVariants())}
        >
        {tag}
        </button>
      ))}
    </div>
  );
}
