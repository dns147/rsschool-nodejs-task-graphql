import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";
import { MemberType } from "./memberType.js";

export const ProfileType = new GraphQLObjectType({
  name: 'profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    user: { type: new GraphQLNonNull(UserType) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    memberType: { type: new GraphQLNonNull(MemberType) },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// model Profile {
//   id          String  @id @default(uuid())
//   isMale      Boolean
//   yearOfBirth Int

//   user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
//   userId       String     @unique
//   memberType   MemberType @relation(fields: [memberTypeId], references: [id], onDelete: Restrict)
//   memberTypeId String
// }
