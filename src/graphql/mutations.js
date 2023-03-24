/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
export const createGameStats = /* GraphQL */ `
  mutation CreateGameStats(
    $input: CreateGameStatsInput!
    $condition: ModelGameStatsConditionInput
  ) {
    createGameStats(input: $input, condition: $condition) {
      id
      gameID
      userEmail
      gameName
      gameStates
      gameScore {
        items {
          id
          gameStatsID
          numberOfPlayers
          gameComments
          gameTotalTime
          completed
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
export const updateGameStats = /* GraphQL */ `
  mutation UpdateGameStats(
    $input: UpdateGameStatsInput!
    $condition: ModelGameStatsConditionInput
  ) {
    updateGameStats(input: $input, condition: $condition) {
      id
      gameID
      userEmail
      gameName
      gameStates
      gameScore {
        items {
          id
          gameStatsID
          numberOfPlayers
          gameComments
          gameTotalTime
          completed
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
export const deleteGameStats = /* GraphQL */ `
  mutation DeleteGameStats(
    $input: DeleteGameStatsInput!
    $condition: ModelGameStatsConditionInput
  ) {
    deleteGameStats(input: $input, condition: $condition) {
      id
      gameID
      userEmail
      gameName
      gameStates
      gameScore {
        items {
          id
          gameStatsID
          numberOfPlayers
          gameComments
          gameTotalTime
          completed
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
export const createGameScore = /* GraphQL */ `
  mutation CreateGameScore(
    $input: CreateGameScoreInput!
    $condition: ModelGameScoreConditionInput
  ) {
    createGameScore(input: $input, condition: $condition) {
      id
      gameStatsID
      numberOfPlayers
      gameComments
      gameTotalTime
      completed
      gameStopTime {
        items {
          id
          gameScoreID
          gameStopTime
          gameStop
          createdAt
          updatedAt
        }
        nextToken
      }
      gameHintTime {
        items {
          id
          gameScoreID
          gameHintTime
          gameStop
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
export const updateGameScore = /* GraphQL */ `
  mutation UpdateGameScore(
    $input: UpdateGameScoreInput!
    $condition: ModelGameScoreConditionInput
  ) {
    updateGameScore(input: $input, condition: $condition) {
      id
      gameStatsID
      numberOfPlayers
      gameComments
      gameTotalTime
      completed
      gameStopTime {
        items {
          id
          gameScoreID
          gameStopTime
          gameStop
          createdAt
          updatedAt
        }
        nextToken
      }
      gameHintTime {
        items {
          id
          gameScoreID
          gameHintTime
          gameStop
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
export const deleteGameScore = /* GraphQL */ `
  mutation DeleteGameScore(
    $input: DeleteGameScoreInput!
    $condition: ModelGameScoreConditionInput
  ) {
    deleteGameScore(input: $input, condition: $condition) {
      id
      gameStatsID
      numberOfPlayers
      gameComments
      gameTotalTime
      completed
      gameStopTime {
        items {
          id
          gameScoreID
          gameStopTime
          gameStop
          createdAt
          updatedAt
        }
        nextToken
      }
      gameHintTime {
        items {
          id
          gameScoreID
          gameHintTime
          gameStop
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
export const createGameHintTime = /* GraphQL */ `
  mutation CreateGameHintTime(
    $input: CreateGameHintTimeInput!
    $condition: ModelGameHintTimeConditionInput
  ) {
    createGameHintTime(input: $input, condition: $condition) {
      id
      gameScoreID
      gameHintTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const updateGameHintTime = /* GraphQL */ `
  mutation UpdateGameHintTime(
    $input: UpdateGameHintTimeInput!
    $condition: ModelGameHintTimeConditionInput
  ) {
    updateGameHintTime(input: $input, condition: $condition) {
      id
      gameScoreID
      gameHintTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const deleteGameHintTime = /* GraphQL */ `
  mutation DeleteGameHintTime(
    $input: DeleteGameHintTimeInput!
    $condition: ModelGameHintTimeConditionInput
  ) {
    deleteGameHintTime(input: $input, condition: $condition) {
      id
      gameScoreID
      gameHintTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const createGameStopTime = /* GraphQL */ `
  mutation CreateGameStopTime(
    $input: CreateGameStopTimeInput!
    $condition: ModelGameStopTimeConditionInput
  ) {
    createGameStopTime(input: $input, condition: $condition) {
      id
      gameScoreID
      gameStopTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const updateGameStopTime = /* GraphQL */ `
  mutation UpdateGameStopTime(
    $input: UpdateGameStopTimeInput!
    $condition: ModelGameStopTimeConditionInput
  ) {
    updateGameStopTime(input: $input, condition: $condition) {
      id
      gameScoreID
      gameStopTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const deleteGameStopTime = /* GraphQL */ `
  mutation DeleteGameStopTime(
    $input: DeleteGameStopTimeInput!
    $condition: ModelGameStopTimeConditionInput
  ) {
    deleteGameStopTime(input: $input, condition: $condition) {
      id
      gameScoreID
      gameStopTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const createGameStop = /* GraphQL */ `
  mutation CreateGameStop(
    $input: CreateGameStopInput!
    $condition: ModelGameStopConditionInput
  ) {
    createGameStop(input: $input, condition: $condition) {
      id
      gameID
      gameStopName
      order
      createdAt
      updatedAt
    }
  }
`;
export const updateGameStop = /* GraphQL */ `
  mutation UpdateGameStop(
    $input: UpdateGameStopInput!
    $condition: ModelGameStopConditionInput
  ) {
    updateGameStop(input: $input, condition: $condition) {
      id
      gameID
      gameStopName
      order
      createdAt
      updatedAt
    }
  }
`;
export const deleteGameStop = /* GraphQL */ `
  mutation DeleteGameStop(
    $input: DeleteGameStopInput!
    $condition: ModelGameStopConditionInput
  ) {
    deleteGameStop(input: $input, condition: $condition) {
      id
      gameID
      gameStopName
      order
      createdAt
      updatedAt
    }
  }
`;
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
      id
      gameName
      gameDescriptionH2
      gameDescriptionH3
      gameDescriptionP
      gameLocationPlace
      gameLocationCity
      gameType
      gameStopString
      gameStop {
        items {
          id
          gameID
          gameStopName
          order
          createdAt
          updatedAt
        }
        nextToken
      }
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
      id
      gameName
      gameDescriptionH2
      gameDescriptionH3
      gameDescriptionP
      gameLocationPlace
      gameLocationCity
      gameType
      gameStopString
      gameStop {
        items {
          id
          gameID
          gameStopName
          order
          createdAt
          updatedAt
        }
        nextToken
      }
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
      id
      gameName
      gameDescriptionH2
      gameDescriptionH3
      gameDescriptionP
      gameLocationPlace
      gameLocationCity
      gameType
      gameStopString
      gameStop {
        items {
          id
          gameID
          gameStopName
          order
          createdAt
          updatedAt
        }
        nextToken
      }
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserGamePlay = /* GraphQL */ `
  mutation CreateUserGamePlay(
    $input: CreateUserGamePlayInput!
    $condition: ModelUserGamePlayConditionInput
  ) {
    createUserGamePlay(input: $input, condition: $condition) {
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
        gameStopString
        gameStop {
          nextToken
        }
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
export const updateUserGamePlay = /* GraphQL */ `
  mutation UpdateUserGamePlay(
    $input: UpdateUserGamePlayInput!
    $condition: ModelUserGamePlayConditionInput
  ) {
    updateUserGamePlay(input: $input, condition: $condition) {
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
        gameStopString
        gameStop {
          nextToken
        }
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
export const deleteUserGamePlay = /* GraphQL */ `
  mutation DeleteUserGamePlay(
    $input: DeleteUserGamePlayInput!
    $condition: ModelUserGamePlayConditionInput
  ) {
    deleteUserGamePlay(input: $input, condition: $condition) {
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
        gameStopString
        gameStop {
          nextToken
        }
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
