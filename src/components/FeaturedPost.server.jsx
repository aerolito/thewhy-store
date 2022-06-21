import {Image, Link} from '@shopify/hydrogen';

export default function FeaturedPost({post}) {
  return (
    <div className="text-md mb-4 relative">
      <div className="rounded-lg border-2 w-[300px] border-gray-200 mb-2 relative flex items-center justify-center overflow-hidden object-cover h-96">
        {post?.image?.src ? (
          <Image
            className="bg-white absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-contain hover:scale-110"
            src={post.image.src}
            width="300px"
            height="400px"
          />
        ) : null}
      </div>
      <h2>{post?.title}</h2>
      <Link to={`/produtos/${post?.handle}`}>Saiba mais</Link>
    </div>
  );
}
