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
      gameID
      userEmail
      gameName
      gameStates
      gameScore {
        items {
          id
          gameStatsID
          gameID
          numberOfPlayers
          teamName
          teamLocation
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
export const onUpdateGameStats = /* GraphQL */ `
  subscription OnUpdateGameStats(
    $filter: ModelSubscriptionGameStatsFilterInput
  ) {
    onUpdateGameStats(filter: $filter) {
      id
      gameID
      userEmail
      gameName
      gameStates
      gameScore {
        items {
          id
          gameStatsID
          gameID
          numberOfPlayers
          teamName
          teamLocation
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
export const onDeleteGameStats = /* GraphQL */ `
  subscription OnDeleteGameStats(
    $filter: ModelSubscriptionGameStatsFilterInput
  ) {
    onDeleteGameStats(filter: $filter) {
      id
      gameID
      userEmail
      gameName
      gameStates
      gameScore {
        items {
          id
          gameStatsID
          gameID
          numberOfPlayers
          teamName
          teamLocation
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
export const onCreateGameScore = /* GraphQL */ `
  subscription OnCreateGameScore(
    $filter: ModelSubscriptionGameScoreFilterInput
  ) {
    onCreateGameScore(filter: $filter) {
      id
      gameStatsID
      gameID
      numberOfPlayers
      teamName
      teamLocation
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
export const onUpdateGameScore = /* GraphQL */ `
  subscription OnUpdateGameScore(
    $filter: ModelSubscriptionGameScoreFilterInput
  ) {
    onUpdateGameScore(filter: $filter) {
      id
      gameStatsID
      gameID
      numberOfPlayers
      teamName
      teamLocation
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
export const onDeleteGameScore = /* GraphQL */ `
  subscription OnDeleteGameScore(
    $filter: ModelSubscriptionGameScoreFilterInput
  ) {
    onDeleteGameScore(filter: $filter) {
      id
      gameStatsID
      gameID
      numberOfPlayers
      teamName
      teamLocation
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
export const onCreateGameStop = /* GraphQL */ `
  subscription OnCreateGameStop($filter: ModelSubscriptionGameStopFilterInput) {
    onCreateGameStop(filter: $filter) {
      id
      gameID
      gameStopName
      order
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGameStop = /* GraphQL */ `
  subscription OnUpdateGameStop($filter: ModelSubscriptionGameStopFilterInput) {
    onUpdateGameStop(filter: $filter) {
      id
      gameID
      gameStopName
      order
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGameStop = /* GraphQL */ `
  subscription OnDeleteGameStop($filter: ModelSubscriptionGameStopFilterInput) {
    onDeleteGameStop(filter: $filter) {
      id
      gameID
      gameStopName
      order
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGameHintTime = /* GraphQL */ `
  subscription OnCreateGameHintTime(
    $filter: ModelSubscriptionGameHintTimeFilterInput
  ) {
    onCreateGameHintTime(filter: $filter) {
      id
      gameScoreID
      gameHintTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGameHintTime = /* GraphQL */ `
  subscription OnUpdateGameHintTime(
    $filter: ModelSubscriptionGameHintTimeFilterInput
  ) {
    onUpdateGameHintTime(filter: $filter) {
      id
      gameScoreID
      gameHintTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGameHintTime = /* GraphQL */ `
  subscription OnDeleteGameHintTime(
    $filter: ModelSubscriptionGameHintTimeFilterInput
  ) {
    onDeleteGameHintTime(filter: $filter) {
      id
      gameScoreID
      gameHintTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGameStopTime = /* GraphQL */ `
  subscription OnCreateGameStopTime(
    $filter: ModelSubscriptionGameStopTimeFilterInput
  ) {
    onCreateGameStopTime(filter: $filter) {
      id
      gameScoreID
      gameStopTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGameStopTime = /* GraphQL */ `
  subscription OnUpdateGameStopTime(
    $filter: ModelSubscriptionGameStopTimeFilterInput
  ) {
    onUpdateGameStopTime(filter: $filter) {
      id
      gameScoreID
      gameStopTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGameStopTime = /* GraphQL */ `
  subscription OnDeleteGameStopTime(
    $filter: ModelSubscriptionGameStopTimeFilterInput
  ) {
    onDeleteGameStopTime(filter: $filter) {
      id
      gameScoreID
      gameStopTime
      gameStop
      createdAt
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
    onUpdateGame(filter: $filter) {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
    onDeleteGame(filter: $filter) {
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
