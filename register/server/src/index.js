const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const { Post } = require("./models/Post");
const configMongoose = require("./config.js");

const app = express();

const corsOptions = {
  credentials: true,
  origin: ["https://studio.apollographql.com", "http://localhost:3000"],
};

const typeDefs = gql`
  type Query {
    hello: String!
    posts: [Post!]!
  }

  type Mutation {
    createPost(author: String!, content: String!): Post!
  }

  type Post {
    id: ID!
    author: String!
    content: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello there I am a string!",
    posts: async () => {
      const posts = await Post.find();

      return posts;
    },
  },

  Mutation: {
    createPost: (parent, args, context, info) => {
      const post = new Post({ author: args.author, content: args.content });

      return post.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();

  server.applyMiddleware({ app, cors: corsOptions });

  const dbConfig = configMongoose.database;
  const dbURI = configMongoose.databaseURI;

  /*await mongoose.connect(*/
    /*`mongodb+srv://elena:mongodatabase@test-cluster.mmymd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,*/
    /*`mongodb+srv://elena:elena@cluster0.ksp7m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  );*/
  await mongoose.connect(dbURI, dbConfig);

  app.listen({ port: 4000 }, () =>
    console.log(
      `graphql server ready at http://localhost:4000${server.graphqlPath}`
    )
  );
};
startServer();
