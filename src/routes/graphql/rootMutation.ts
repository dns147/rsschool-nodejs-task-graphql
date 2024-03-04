import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { TUserType } from "./types/userType.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "./types/uuid.js";
import { TPostType } from "./types/postType.js";
import { TProfileType } from "./types/profileType.js";
import { MemberEnumType } from "./types/memberEnumType.js";

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: TUserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: async (_, { name, balance }, context: PrismaClient) => {
        return await context.user.create({
          data: { name, balance },
        });
      },
    },

    changeUser: {
      type: TUserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
      },
      resolve: async (_, { id, name, balance }, context: PrismaClient) => {
        return await context.user.update({
          where: { id: id },
          data: { name, balance },
        });
      },
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }, context: PrismaClient) => {
        try {
          await context.user.delete({
            where: { id: id },
          });
        } catch {
          return false;
        }

        return true;
      },
    },

    createPost: {
      type: TPostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { title, content, authorId }, context: PrismaClient) => {
        return await context.post.create({
          data: { title, content, authorId },
        });
      },
    },

    changePost: {
      type: TPostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
      },
      resolve: async (_, { id, title, content }, context: PrismaClient) => {
        return await context.post.update({
          where: { id: id },
          data: { title, content },
        });
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }, context: PrismaClient) => {
        try {
          await context.post.delete({
            where: { id: id },
          });
        } catch {
          return false;
        }

        return true;
      },
    },

    createProfile: {
      type: TProfileType,
      args: {
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberTypeId: { type: new GraphQLNonNull(MemberEnumType) },
        userId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { isMale, yearOfBirth, memberTypeId, userId }, context: PrismaClient) => {
        return await context.profile.create({
          data: { isMale, yearOfBirth, memberTypeId, userId },
        });
      },
    },

    changeProfile: {
      type: TProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberTypeId: { type: new GraphQLNonNull(MemberEnumType) },
      },
      resolve: async (_, { id, isMale, yearOfBirth, memberTypeId }, context: PrismaClient) => {
        return await context.profile.update({
          where: { id: id },
          data: { isMale, yearOfBirth, memberTypeId },
        });
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }, context: PrismaClient) => {
        try {
          await context.profile.delete({
            where: { id: id },
          });
        } catch {
          return false;
        }

        return true;
      },
    },

    subscribeTo: {
      type: TUserType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args, context: PrismaClient) => {
        return await context.user.update({
          where: { id: args.userId },
          data: {
            userSubscribedTo: {
              create: {
                authorId: args.authorId,
              },
            },
          },
        });
      },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args, context: PrismaClient) => {
        try {
          await context.subscribersOnAuthors.delete({
            where: {
              subscriberId_authorId: {
                authorId: args.authorId,
                subscriberId: args.userId,
              },
            },
          });
        } catch {
          return false;
        }

        return true;
      },
    },
  },
});
