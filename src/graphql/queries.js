/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      test {
        title
        email
      }
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        test {
          title
          email
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGameStats = /* GraphQL */ `
  query GetGameStats($id: ID!) {
    getGameStats(id: $id) {
      id
      gameID
      userEmail
      gameName
      gameComments
      gameStates
      gameTime
      type
      createdAt
      updatedAt
    }
  }
`;
export const listGameStats = /* GraphQL */ `
  query ListGameStats(
    $filter: ModelGameStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameStats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gameID
        userEmail
        gameName
        gameComments
        gameStates
        gameTime
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      gameName
      gameDescriptionH2
      gameDescriptionH3
      gameDescriptionP
      gameLocationPlace
      gameLocationCity
      gameType
      gameStop
      type
      createdAt
      user {
        items {
          id
          gameId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gameName
        gameDescriptionH2
        gameDescriptionH3
        gameDescriptionP
        gameLocationPlace
        gameLocationCity
        gameType
        gameStop
        type
        createdAt
        user {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      userName
      description
      email
      game {
        items {
          id
          gameId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        description
        email
        game {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserGamePlay = /* GraphQL */ `
  query GetUserGamePlay($id: ID!) {
    getUserGamePlay(id: $id) {
      id
      gameId
      userId
      game {
        id
        gameName
        gameDescriptionH2
        gameDescriptionH3
        gameDescriptionP
        gameLocationPlace
        gameLocationCity
        gameType
        gameStop
        type
        createdAt
        user {
          nextToken
        }
        updatedAt
      }
      user {
        id
        userName
        description
        email
        game {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserGamePlays = /* GraphQL */ `
  query ListUserGamePlays(
    $filter: ModelUserGamePlayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserGamePlays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gameId
        userId
        game {
          id
          gameName
          gameDescriptionH2
          gameDescriptionH3
          gameDescriptionP
          gameLocationPlace
          gameLocationCity
          gameType
          gameStop
          type
          createdAt
          updatedAt
        }
        user {
          id
          userName
          description
          email
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameStatsByGameID = /* GraphQL */ `
  query GameStatsByGameID(
    $gameID: String!
    $sortDirection: ModelSortDirection
    $filter: ModelGameStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameStatsByGameID(
      gameID: $gameID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameID
        userEmail
        gameName
        gameComments
        gameStates
        gameTime
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameStatsByUserEmail = /* GraphQL */ `
  query GameStatsByUserEmail(
    $userEmail: String!
    $sortDirection: ModelSortDirection
    $filter: ModelGameStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameStatsByUserEmail(
      userEmail: $userEmail
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameID
        userEmail
        gameName
        gameComments
        gameStates
        gameTime
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameStatsByGameNameAndType = /* GraphQL */ `
  query GameStatsByGameNameAndType(
    $gameName: String!
    $type: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameStatsByGameNameAndType(
      gameName: $gameName
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameID
        userEmail
        gameName
        gameComments
        gameStates
        gameTime
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameStatsByDate = /* GraphQL */ `
  query GameStatsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameStatsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameID
        userEmail
        gameName
        gameComments
        gameStates
        gameTime
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gamesByGameNameAndType = /* GraphQL */ `
  query GamesByGameNameAndType(
    $gameName: String!
    $type: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gamesByGameNameAndType(
      gameName: $gameName
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameName
        gameDescriptionH2
        gameDescriptionH3
        gameDescriptionP
        gameLocationPlace
        gameLocationCity
        gameType
        gameStop
        type
        createdAt
        user {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const gamesByDate = /* GraphQL */ `
  query GamesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gamesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameName
        gameDescriptionH2
        gameDescriptionH3
        gameDescriptionP
        gameLocationPlace
        gameLocationCity
        gameType
        gameStop
        type
        createdAt
        user {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const usersByEmail = /* GraphQL */ `
  query UsersByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userName
        description
        email
        game {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userGamePlaysByGameId = /* GraphQL */ `
  query UserGamePlaysByGameId(
    $gameId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserGamePlayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGamePlaysByGameId(
      gameId: $gameId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameId
        userId
        game {
          id
          gameName
          gameDescriptionH2
          gameDescriptionH3
          gameDescriptionP
          gameLocationPlace
          gameLocationCity
          gameType
          gameStop
          type
          createdAt
          updatedAt
        }
        user {
          id
          userName
          description
          email
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userGamePlaysByUserId = /* GraphQL */ `
  query UserGamePlaysByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserGamePlayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGamePlaysByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        gameId
        userId
        game {
          id
          gameName
          gameDescriptionH2
          gameDescriptionH3
          gameDescriptionP
          gameLocationPlace
          gameLocationCity
          gameType
          gameStop
          type
          createdAt
          updatedAt
        }
        user {
          id
          userName
          description
          email
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
