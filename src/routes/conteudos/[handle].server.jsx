import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {BackButton} from '../../components/BackButton.client';
import {Slogan} from '../../components/Slogan.server';

export default function Page({params}) {
  const {handle} = params;

  const {data} = useShopQuery({
    query: QUERY,
    variables: {handle},
    preload: true,
  });

  const blogs = data ? flattenConnection(data.blogs) : null;
  const article = blogs
    ? blogs?.map((blog) => {
        return flattenConnection(blog.articles);
      })[0][0]
    : null;

  return (
    <>
      <Slogan />
      <div className="text-center flex flex-col justify-center items-center mt-12">
        <h2 className="text-subtitleMobile md:text-subtitle font-bold mb-[4rem]">
          Conteúdos
        </h2>

        <img
          className="max-h-[400px] object-contain mb-[2rem]"
          width="90%"
          height="intrinsic"
          src={article?.image?.src}
          alt={article?.title}
        />

        <h2 className="text-principal text-left mr-auto text-subtitleMobile md:text-subtitle font-bold">
          {article?.title}
        </h2>

        <p className="text-text text-left text-principal mt-[2rem] mb-[4rem]">
          {article?.content}
        </p>
      </div>
    </>
  );
}

const QUERY = gql`
  query BlogPostDetails($handle: String!) {
    blogs(first: 1) {
      edges {
        node {
          articles(first: 1, query: $handle) {
            edges {
              node {
                title
                content
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
