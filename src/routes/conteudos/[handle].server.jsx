import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';
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
      <div className="text-center flex flex-col justify-center items-center">
        <h2 className="text-subtitleMobile md:text-subtitle font-bold mb-12">
          Conteúdos
        </h2>

        <img
          className=" object-contain mb-12"
          width="100%"
          height="intrinsic"
          src={article?.image?.src}
          alt={article?.title}
        />

        <h2 className="text-principal text-left mr-auto text-subtitleMobile md:text-subtitle font-bold">
          {article?.title}
        </h2>

        <div
          className="text-text text-left text-principal mt-12 mb-[4rem]"
          dangerouslySetInnerHTML={{__html: article.contentHtml}}
        ></div>
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
