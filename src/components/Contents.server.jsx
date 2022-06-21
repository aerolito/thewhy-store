import {flattenConnection, useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import Post from './Post.server';

export default function Contents() {
  const {data} = useShopQuery({query: CONTENTS_QUERY, preload: true});
  const blogs = data ? flattenConnection(data.blogs) : null;
  const articles = blogs
    ? blogs?.map((blog) => {
        return flattenConnection(blog.articles);
      })[0]
    : null;

  return (
    <div>
      <h2 className="text-center text-principal text-subtitleMobile md:text-subtitle font-bold mb-12 mt-6">
        conteúdos
      </h2>
      <div className="flex gap-[2rem] max-w-[1024px] m-auto w-full mb-[2rem] flex-wrap justify-center md:justify-start">
        {articles?.map((article) => {
          return <Post key={article.id} post={article} />;
        })}
      </div>
    </div>
  );
}

const CONTENTS_QUERY = gql`
  query SearcherContent {
    blogs(first: 1) {
      edges {
        node {
          articles(first: 3) {
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
