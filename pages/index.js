import Head from "next/head";
import Link from "next/link";
import { request, gql } from "graphql-request";

export async function getStaticProps() {
  const query = gql`
    query Entries {
      entries(collection: "articles") {
        data {
          id
          slug
          title
        }
      }
    }
  `;

  const response = await request("http://statamic3.test/graphql", query);

  return {
    props: {
      posts: response.entries.data,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <ul>
        {posts.map(({ id, slug, title }) => (
          <li key={id}>
            <Link href={`/articles/${slug}`}>
              <a className="text-blue-600">{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
