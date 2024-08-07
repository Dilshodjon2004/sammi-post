import {useState} from "react";
import {IPost} from "@/interfaces";
import {Card, CardContent, CardFooter, CardTitle} from "../ui/card";
import {Button} from "../ui/button";
import {useConfrim} from "@/hooks/use-confirm";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {postSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {useMutation} from "@tanstack/react-query";
import {postStore} from "@/store/post.store";
import {toast} from "sonner";
import FillLoading from "../shared/fill-loading";
import $api from "@/http/api";
import {API_URL} from "@/http";

function PostCard({post}: {post: IPost}) {
  const {onOpen, setPost} = useConfrim();
  const [open, setOpen] = useState(false);
  const {posts, setPosts} = postStore();

  const onDelete = () => {
    onOpen();
    setPost(post);
  };

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const {mutate, isPending} = useMutation({
    mutationKey: ["edit-post"],
    mutationFn: async (values: z.infer<typeof postSchema>) => {
      const {data} = await $api.put(`/post/edit/${post._id}`, values);
      return data;
    },
    onSuccess: (data) => {
      const newData = posts.map((c) => (c._id === data._id ? data : c));
      setPosts(newData);
      setOpen(false);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response?.data?.message);
    },
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    mutate(values);
  }
  return (
    <Card>
      <img
        src={`${API_URL}/${post.picture}`}
        alt={post.title}
        className='rounded-t object-cover w-full h-48'
      />
      <CardContent className='mt-2'>
        <CardTitle className='line-clamp-1 text-xl'>{post.title}</CardTitle>
        <p className='line-clamp-2 mt-1 text-muted-foreground text-sm'>
          {post.body}
        </p>
      </CardContent>
      <CardFooter className='gap-2'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className='w-full rounded'>Edit</Button>
          </PopoverTrigger>
          <PopoverContent className='w-96'>
            {isPending && <FillLoading />}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-2 mt-6'
              >
                <FormField
                  control={form.control}
                  name='title'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Title:</FormLabel>
                      <FormControl>
                        <Input
                          className='bg-secondary rounded'
                          placeholder='Create a post blog'
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='body'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Body:</FormLabel>
                      <FormControl>
                        <Textarea
                          className='bg-secondary rounded'
                          placeholder='In this article you can improve...'
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={isPending}>
                  Submit
                </Button>
              </form>
            </Form>
          </PopoverContent>
        </Popover>
        <Button
          variant={"destructive"}
          className='w-full rounded'
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
