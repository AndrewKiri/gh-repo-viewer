import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.GRAPHQL_API_URL as string]: {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN as string}`,
        },
      },
    },
  ],
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "typescript-document-nodes",
        "fragment-matcher",
        "time",
      ],
      config: {
        message: "The file was generated on: DD.MM.YYYY HH:mm:ss Z",
        gqlImport: "@apollo/client#gql",
      },
    },
    "src/generated/graphql.d.ts": {
      plugins: ["typescript-graphql-files-modules", "time"],
      config: {
        message: "The file was generated on: DD.MM.YYYY HH:mm:ss Z",
      },
    },
    "src/generated/schema.graphql": {
      plugins: ["schema-ast", "time"],
      config: {
        message: "The file was generated on: DD.MM.YYYY HH:mm:ss Z",
      },
    },
  },
};

export default config;
