/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
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
export const onCreateGameStats = /* GraphQL */ `
  subscription OnCreateGameStats(
    $filter: ModelSubscriptionGameStatsFilterInput
  ) {
    onCreateGameStats(filter: $filter) {
      id
      gameName
      gameScore
      gameStates
      gameTime
      type
      createdAt
      user {
        items {
          id
          gameStatsId
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
export const onUpdateGameStats = /* GraphQL */ `
  subscription OnUpdateGameStats(
    $filter: ModelSubscriptionGameStatsFilterInput
  ) {
    onUpdateGameStats(filter: $filter) {
      id
      gameName
      gameScore
      gameStates
      gameTime
      type
      createdAt
      user {
        items {
          id
          gameStatsId
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
export const onDeleteGameStats = /* GraphQL */ `
  subscription OnDeleteGameStats(
    $filter: ModelSubscriptionGameStatsFilterInput
  ) {
    onDeleteGameStats(filter: $filter) {
      id
      gameName
      gameScore
      gameStates
      gameTime
      type
      createdAt
      user {
        items {
          id
          gameStatsId
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
    onCreateGame(filter: $filter) {
      id
      gameName
      gameDescriptionH2
      gameDescriptionH3
      gameDescriptionP
      gameLocation
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
    onUpdateGame(filter: $filter) {
      id
      gameName
      gameDescriptionH2
      gameDescriptionH3
      gameDescriptionP
      gameLocation
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
    onDeleteGame(filter: $filter) {
      id
      gameName
      gameDescriptionH2
      gameDescriptionH3
      gameDescriptionP
      gameLocation
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
      gameStats {
        items {
          id
          gameStatsId
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
      gameStats {
        items {
          id
          gameStatsId
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
      gameStats {
        items {
          id
          gameStatsId
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
export const onCreateUserGameStats = /* GraphQL */ `
  subscription OnCreateUserGameStats(
    $filter: ModelSubscriptionUserGameStatsFilterInput
  ) {
    onCreateUserGameStats(filter: $filter) {
      id
      gameStatsId
      userId
      gameStats {
        id
        gameName
        gameScore
        gameStates
        gameTime
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
        gameStats {
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
export const onUpdateUserGameStats = /* GraphQL */ `
  subscription OnUpdateUserGameStats(
    $filter: ModelSubscriptionUserGameStatsFilterInput
  ) {
    onUpdateUserGameStats(filter: $filter) {
      id
      gameStatsId
      userId
      gameStats {
        id
        gameName
        gameScore
        gameStates
        gameTime
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
        gameStats {
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
export const onDeleteUserGameStats = /* GraphQL */ `
  subscription OnDeleteUserGameStats(
    $filter: ModelSubscriptionUserGameStatsFilterInput
  ) {
    onDeleteUserGameStats(filter: $filter) {
      id
      gameStatsId
      userId
      gameStats {
        id
        gameName
        gameScore
        gameStates
        gameTime
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
        gameStats {
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
export const onCreateUserGamePlay = /* GraphQL */ `
  subscription OnCreateUserGamePlay(
    $filter: ModelSubscriptionUserGamePlayFilterInput
  ) {
    onCreateUserGamePlay(filter: $filter) {
      id
      gameId
      userId
      game {
        id
        gameName
        gameDescriptionH2
        gameDescriptionH3
        gameDescriptionP
        gameLocation
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
        gameStats {
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
export const onUpdateUserGamePlay = /* GraphQL */ `
  subscription OnUpdateUserGamePlay(
    $filter: ModelSubscriptionUserGamePlayFilterInput
  ) {
    onUpdateUserGamePlay(filter: $filter) {
      id
      gameId
      userId
      game {
        id
        gameName
        gameDescriptionH2
        gameDescriptionH3
        gameDescriptionP
        gameLocation
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
        gameStats {
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
export const onDeleteUserGamePlay = /* GraphQL */ `
  subscription OnDeleteUserGamePlay(
    $filter: ModelSubscriptionUserGamePlayFilterInput
  ) {
    onDeleteUserGamePlay(filter: $filter) {
      id
      gameId
      userId
      game {
        id
        gameName
        gameDescriptionH2
        gameDescriptionH3
        gameDescriptionP
        gameLocation
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
        gameStats {
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
