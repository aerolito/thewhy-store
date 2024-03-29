import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Slogan} from '../../components/Layout/Slogan.server';

export default function Page({params}) {
  const {handle} = params;

  const {data} = useShopQuery({
    query: QUERY,
    variables: {handle},
    preload: true,
    cache: {maxAge: 60 * 60 * 24},
  });

  const blogs = data ? flattenConnection(data.blogs) : null;
  const article = blogs
    ? blogs?.map((blog) => {
        return flattenConnection(blog.articles);
      })[0][0]
    : null;

  const postTitle = article?.title?.split(':');

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
          <b>
            {postTitle[0]}
            {postTitle[1] && ':'}
          </b>{' '}
          <span className=" font-[Roboto, sans-serif] font-light italic">
            {postTitle[1]}
          </span>
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
