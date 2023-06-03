import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag'


const typeDefs = gql`
  type Query {
    sayHello: String
  }
  type Query{
    sayBye:String
  }
`;

const resolvers = {
  Query: {
    sayHello: () => 'Hello World',
    sayBye:()=>'Say Bye'
  },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
export default startServerAndCreateNextHandler(apolloServer);