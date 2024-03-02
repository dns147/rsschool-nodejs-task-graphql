import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";

export const PostType = new GraphQLObjectType({
  name: 'post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(UserType) },
    authorId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// model Post {
//   id      String @id @default(uuid())
//   title   String
//   content String

//   author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
//   authorId String
// }
