import { GraphQLObjectType } from "graphql";
import { TUserType } from "./types/userType.js";

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: TUserType,
      resolve: async () => {
        return true;
      },
    },
  },
});