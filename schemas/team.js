const model = require('../models');

exports.typeDefs = `
  type Team {
    teamId: ID!
    name: String!
    logoData: String
    votes (matchId: ID): [Vote]
  }
`;

exports.query = `
  team(
    teamId: ID!
  ): Team
`;

exports.mutation = `
  createTeam(
    name: String!
    logoData: String
  ): Team!

  updateTeamLogo(
    teamId: ID!
    logoData: String!
  ): Team!

  updateTeamName(
    teamId: String!
    name: String!
  ): Team!
`;

exports.resolvers = {
  Query: {
    team (root, { teamId }, context) {
      return model.findTeam({ teamId }, context);
    }
  },

  Mutation: {
    createTeam (root, { name, logoData }, context) {
      return model.createTeam({ name, logoData }, context);
    },

    updateTeamLogo (root, { teamId, logoData }, context) {
      return model.updateTeamLogo({ teamId, logoData }, context);
    },

    updateTeamName (root, { teamId, name }, context) {
      return model.updateTeamName({ teamId, name }, context);
    }
  },

  Team: {
    votes ({ teamId }, { matchId }, context) {
      return model.findVotes({ teamId, matchId }, context);
    }
  }
};
