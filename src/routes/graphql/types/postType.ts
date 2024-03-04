import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { TUserType } from "./userType.js";
import { Post, PrismaClient } from "@prisma/client";

export const TPostType = new GraphQLObjectType({
  name: 'postType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: { 
      type: new GraphQLNonNull(TUserType),
      resolve: async (source: Post, _, context: PrismaClient) => {
        return await context.user.findUnique({
          where: {
            id: source.authorId,
          },
        });
      },
    },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});
