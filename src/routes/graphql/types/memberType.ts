import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { TProfileType } from "./profileType.js";
import { MemberType, PrismaClient } from "@prisma/client";
import { MemberEnumType } from "./memberEnumType.js";

export const TMemberType = new GraphQLObjectType({
  name: 'memberType',
  fields: () => ({
    id: { type: MemberEnumType },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    profiles: { 
      type: new GraphQLList(TProfileType),
      resolve: async (source: MemberType, _, context: PrismaClient) => {
        return await context.profile.findMany({
          where: {
            id: source.id,
          },
        });
      },
    },
  }),
});
