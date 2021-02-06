import { request, gql } from "graphql-request";

export async function getStaticProps({ params }) {
  const query = gql`
    query Entry($uri: String) {
      entry(uri: $uri) {
        title
        ... on Entry_Pages_Page {
          content
        }
      }
    }
  `;

  const response = await request("http://statamic3.test/graphql", query, {
    uri: `/${params.uri.join("/")}`,
  });

  return {
    props: {
      page: response.entry,
    },
  };
}

export async function getStaticPaths() {
  const query = gql`
    query Pages {
      entries(collection: "pages", filter: { uri: { isnt: "/" } }) {
        data {
          uri
        }
      }
    }
  `;

  const response = await request("http://statamic3.test/graphql", query);

  const paths = response.entries.data.map((entry) => {
    return {
      params: {
        uri: entry.uri.split("/").splice(1),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default function Page({ page }) {
  return (
    <div>
      <h1 class="text-3xl font-bold mb-8">{page.title}</h1>
      <div
        class="prose"
        dangerouslySetInnerHTML={{ __html: page.content }}
      ></div>
    </div>
  );
}
