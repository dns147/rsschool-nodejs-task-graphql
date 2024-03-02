import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { PostType } from "./post.js";
import { ProfileType } from "./profile.js";

export const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { type: new GraphQLNonNull(ProfileType) },
    posts: { type: new GraphQLList(PostType) },
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