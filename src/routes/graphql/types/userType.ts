import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { TPostType } from "./postType.js";
import { TProfileType } from "./profileType.js";
import { PrismaClient, User } from "@prisma/client";

export const TUserType = new GraphQLObjectType({
  name: 'userType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { 
      type: TProfileType,
      resolve: async (source: User, _, context: PrismaClient) => {
        return await context.profile.findUnique({
          where: {
            userId: source.id,
          },
        });
      },
    },
    posts: { 
      type: new GraphQLList(TPostType),
      resolve: async (source: User, _, context: PrismaClient) => {
        return await context.post.findMany({
          where: {
            authorId: source.id,
          },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(TUserType),
      resolve: async (source: User, _, context: PrismaClient) => {
        return await context.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: source.id,
              },
            },
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(TUserType),
      resolve: async (source: User, _, context: PrismaClient) => {
        return await context.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: source.id,
              },
            },
          },
        });
      },
    },
  }),
});

// model User {
//   id      String @id @default(uuid())
//   name    String
//   balance Float

//   profile          Profile?
//   posts            Post[]
//   userSubscribedTo SubscribersOnAuthors[] @relation("subscriber")
//   subscribedToUser SubscribersOnAuthors[] @relation("author")
// }