import {flattenConnection, useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {BackButton} from '../../components/BackButton.client';
import Post from '../../components/Post.server';
import {Slogan} from '../../components/Slogan.server';

export default function Contents(req) {
  const {data} = useShopQuery({
    query: CONTENTS_QUERY,
    variables: {page: 2},
    preload: true,
  });
  const blogs = data ? flattenConnection(data.blogs) : null;
  const articles = blogs
    ? blogs?.map((blog) => {
        return flattenConnection(blog.articles);
      })[0]
    : null;

  return (
    <>
      <Slogan />
      <div className="text-center flex flex-col justify-center items-center mt-12">
        <h2 className="text-subtitleMobile md:text-subtitle font-bold mb-[2rem]">
          Conteúdos
        </h2>

        <div className="flex gap-[2rem] max-w-[1024px] m-auto w-full mb-[2rem] flex-wrap justify-center md:justify-start">
          {articles?.map((article) => {
            return <Post key={article.id} post={article} />;
          })}
        </div>
      </div>
    </>
  );
}

const CONTENTS_QUERY = gql`
  query SearcherContent($page: Int!) {
    blogs(first: 1) {
      edges {
        node {
          articles(first: $page) {
            edges {
              node {
                title
                handle
                content
                contentHtml
                id
                image {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
