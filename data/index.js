import { GraphQLClient } from "graphql-request"; // GraphQL request client

// Create client
const client = new GraphQLClient(
  // Zora mainnet subgraph
  "https://graph.palm.io/subgraphs/name/wighawag/eip721-subgraph"
);

// Export client
export default client;
