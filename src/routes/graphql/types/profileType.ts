import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { TUserType } from "./userType.js";
import { TMemberType } from "./memberType.js";
import { PrismaClient, Profile } from "@prisma/client";
import { MemberEnumType } from "./memberEnumType.js";

export const TProfileType = new GraphQLObjectType({
  name: 'profileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    user: { 
      type: TUserType,
      resolve: async (source: Profile, _, context: PrismaClient) => {
        return await context.user.findUnique({
          where: {
            id: source.userId,
          },
        });
      },
    },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberType: { 
      type: new GraphQLNonNull(TMemberType),
      resolve: async (source: Profile, _, context: PrismaClient) => {
        return await context.memberType.findUnique({
          where: {
            id: source.memberTypeId,
          },
        });
      },
    },
    memberTypeId: { type: MemberEnumType },
  }),
});
