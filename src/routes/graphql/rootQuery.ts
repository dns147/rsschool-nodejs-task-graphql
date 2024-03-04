import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { TMemberType } from "./types/memberType.js";
import { TPostType } from "./types/postType.js";
import { TUserType } from "./types/userType.js";
import { MemberType, Post, PrismaClient, Profile, User } from "@prisma/client";
import { UUIDType } from "./types/uuid.js";
import { TProfileType } from "./types/profileType.js";
import { MemberEnumType } from "./types/memberEnumType.js";

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberType: {
      type: TMemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberEnumType) },
      },
      resolve: async (_, args: MemberType, context: PrismaClient) => {
        return await context.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    memberTypes: {
      type: new GraphQLList(TMemberType),
      resolve: async (_, _args, context: PrismaClient) => {
        return await context.memberType.findMany();
      },
    },
    post: {
      type: TPostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: Post, context: PrismaClient) => {
        return await context.post.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(TPostType),
      resolve: async (_, _args, context: PrismaClient) => {
        return await context.post.findMany();
      },
    },
    user: {
      type: TUserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: User, context: PrismaClient) => {
        return await context.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    users: {
      type: new GraphQLList(TUserType),
      resolve: async (_, _args, context: PrismaClient) => {
        return await context.user.findMany();
      },
    },
    profile: {
      type: TProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: Profile, context: PrismaClient) => {
        return await context.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    profiles: {
      type: new GraphQLList(TProfileType),
      resolve: async (_, _args, context: PrismaClient) => {
        return await context.profile.findMany();
      },
    },
  }),
});
