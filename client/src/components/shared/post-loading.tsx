import {Skeleton} from "../ui/skeleton";

function PostLoading() {
  return (
    <div className='w-full border rounded-md pb-4'>
      <Skeleton className='w-full h-36' />
      <div className='mt-2 px-2'>
        <Skeleton className='w-1/2 h-8 mt-2' />

        <div className='space-y-2 mt-2'>
          <Skeleton className='w-[250px] h-4' />
          <Skeleton className='w-[200px] h-4' />
        </div>

        <div className='grid grid-cols-2 gap-2 mt-6'>
          <Skeleton className='w-full h-10 bg-primary rounded' />
          <Skeleton className='w-full h-10 bg-destructive rounded' />
        </div>
      </div>
    </div>
  );
}

export default PostLoading;
