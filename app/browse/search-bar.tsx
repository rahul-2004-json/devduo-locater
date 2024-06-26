"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";



const formSchema = z.object({
    search: z.string().min(0).max(50), 
});

export function SearchBar(){
  const router = useRouter();
  const query= useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
         search:query.get("search") ?? "",
        },
  });
    
  const search = query.get("search");
  useEffect(() => {
    form.setValue("search", query.get("search") ?? "");
  },[search,form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
        if(values.search){
          router.push(`browse/?search=${values.search}`);  
        }else{
          router.push("/");
        }
      }
    return(
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} 
                className="w-[500px]"
                placeholder="Filter by tags like typescript, java, python"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="gap-2"> <SearchIcon/> Search</Button>
        {
          query.get("search") && (
            <Button type="button" variant="link" onClick={() => {form.setValue("search", "");
              router.push("/browse");}}>Clear</Button>
          )
        }
      </form>
    </Form>
    );
}