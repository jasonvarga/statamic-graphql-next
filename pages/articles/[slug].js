import { request, gql } from "graphql-request";

export async function getStaticProps({ params }) {
  const query = gql`
    query Entry($slug: String) {
      entry(collection: "articles", slug: $slug) {
        id
        slug
        title
        ... on Entry_Articles_Article {
          content
        }
      }
    }
  `;

  const response = await request("http://statamic3.test/graphql", query, {
    slug: params.slug,
  });

  return {
    props: {
      post: response.entry,
    },
  };
}

export async function getStaticPaths() {
  const query = gql`
    query Entries {
      entries(collection: "articles") {
        data {
          slug
        }
      }
    }
  `;

  const response = await request("http://statamic3.test/graphql", query);

  const paths = response.entries.data.map((entry) => ({
    params: { slug: entry.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ post }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}
