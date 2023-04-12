/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      gameImage
      gameType
      gameStopString
      gameLink
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
        gameImage
        gameType
        gameStopString
        gameLink
        type
        createdAt
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
      gameStates
        gameScore {
            items {
              teamName
              numberOfPlayers
              gameTotalTime
              createdAt
              updatedAt
              gameStopTime {
                items {
                    gameStop
                    gameStopTime
                }
              }
              gameHintTime {
                items {
                    gameStop
                    gameHintTime
                }
              }              
            }
        }
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
        gameStates
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGameScore = /* GraphQL */ `
  query GetGameScore($id: ID!) {
    getGameScore(id: $id) {
      id
      gameStatsID
      gameID
      numberOfPlayers
      teamName
      teamLocation
      gameComments
      gameTotalTime
      completed
      firstTime
      gameStopTime {
        nextToken
      }
      gameHintTime {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGameScores = /* GraphQL */ `
  query ListGameScores(
    $filter: ModelGameScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        firstTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGameStop = /* GraphQL */ `
  query GetGameStop($id: ID!) {
    getGameStop(id: $id) {
      id
      gameID
      gameStopName
      order
      createdAt
      updatedAt
    }
  }
`;
export const listGameStops = /* GraphQL */ `
  query ListGameStops(
    $filter: ModelGameStopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameStops(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getGameHintTime = /* GraphQL */ `
  query GetGameHintTime($id: ID!) {
    getGameHintTime(id: $id) {
      id
      gameScoreID
      gameHintTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const listGameHintTimes = /* GraphQL */ `
  query ListGameHintTimes(
    $filter: ModelGameHintTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameHintTimes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getGameStopTime = /* GraphQL */ `
  query GetGameStopTime($id: ID!) {
    getGameStopTime(id: $id) {
      id
      gameScoreID
      gameStopTime
      gameStop
      createdAt
      updatedAt
    }
  }
`;
export const listGameStopTimes = /* GraphQL */ `
  query ListGameStopTimes(
    $filter: ModelGameStopTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameStopTimes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      name
      posts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      blog {
        id
        name
        createdAt
        updatedAt
      }
      comments {
        nextToken
      }
      createdAt
      updatedAt
      blogPostsId
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        createdAt
        updatedAt
        blogPostsId
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      post {
        id
        title
        createdAt
        updatedAt
        blogPostsId
      }
      content
      createdAt
      updatedAt
      postCommentsId
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        updatedAt
        postCommentsId
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
        gameImage
        gameType
        gameStopString
        gameLink
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
        gameImage
        gameType
        gameStopString
        gameLink
        type
        createdAt
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
        gameImage
        gameType
        gameStop {
          items {
            gameStopName
           }
        }
        gameLink
        type
        createdAt
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
        gameStates
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameStatsByGameName = /* GraphQL */ `
  query GameStatsByGameName(
    $gameName: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameStatsByGameName(
      gameName: $gameName
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
        gameStates
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameStatsSortedByGameName = /* GraphQL */ `
  query GameStatsSortedByGameName(
    $type: String!
    $gameName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameStatsSortedByGameName(
      type: $type
      gameName: $gameName
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
        gameStates
               gameScore {
            items {
              teamName
              numberOfPlayers
              gameTotalTime
              createdAt
              updatedAt
              gameStopTime {
                items {
                    gameStop
                    gameStopTime
                }
              }
              gameHintTime {
                items {
                    gameStop
                    gameHintTime
                }
              }              
            }
        }
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameScoreByGameStatsID = /* GraphQL */ `
  query GameScoreByGameStatsID(
    $gameStatsID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameScoreByGameStatsID(
      gameStatsID: $gameStatsID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        firstTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameScoreByGameID = /* GraphQL */ `
  query GameScoreByGameID(
    $gameID: ID!
    $gameTotalTime: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameScoreByGameID(
      gameID: $gameID
      gameTotalTime: $gameTotalTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        firstTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameStopByGameID = /* GraphQL */ `
  query GameStopByGameID(
    $gameID: ID!
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameStopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameStopByGameID(
      gameID: $gameID
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const gameHintTimeByGameScoreID = /* GraphQL */ `
  query GameHintTimeByGameScoreID(
    $gameScoreID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameHintTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameHintTimeByGameScoreID(
      gameScoreID: $gameScoreID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const gameStopTimeByGameScoreID = /* GraphQL */ `
  query GameStopTimeByGameScoreID(
    $gameScoreID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameStopTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameStopTimeByGameScoreID(
      gameScoreID: $gameScoreID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
