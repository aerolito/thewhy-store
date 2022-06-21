import {Image} from '@shopify/hydrogen';

export default function Post({post}) {
  return (
    <div className="text-md mb-4 relative cursor-pointer w-[300px] flex flex-col flex-wrap">
      <a href={`/conteudos/${post?.handle}`}>
        <div className="rounded-lg w-[300px]  mb-2 relative flex items-center justify-center overflow-hidden h-96">
          {post?.image?.src ? (
            <Image
              className="bg-white absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-cover hover:scale-110"
              src={post.image.src}
              width="300px"
              height="400px"
            />
          ) : null}
        </div>
        <h2 className="text-principal text-highlighted">{post.title}</h2>
      </a>
    </div>
  );
}
