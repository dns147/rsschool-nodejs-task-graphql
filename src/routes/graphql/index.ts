import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, parse, validate } from 'graphql';
import { rootQuery } from './rootQuery.js';
import { rootMutation } from './rootMutation.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const schema = new GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation,
      });

      const { query, variables } = req.body;
      const { prisma } = fastify;
      const errors = validate(schema, parse(query), [depthLimit(5)]);

      if (errors.length) {
        return { errors };
      }
  
      return graphql({
        schema: schema,
        source: query,
        variableValues: variables,
        contextValue: prisma,
      });
    },
  });
};

export default plugin;
