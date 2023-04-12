/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
          userId
          gameId
          user {
            id
            userName
            description
            email
            game {
              items {
                id
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            updatedAt
          }
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
          userId
          gameId
          user {
            id
            userName
            description
            email
            game {
              items {
                id
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            updatedAt
          }
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
          userId
          gameId
          user {
            id
            userName
            description
            email
            game {
              items {
                id
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            updatedAt
          }
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
      gameImage
      gameType
      gameStopString
      gameLink
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
          userId
          gameId
          user {
            id
            userName
            description
            email
            game {
              items {
                id
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            updatedAt
          }
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
      gameImage
      gameType
      gameStopString
      gameLink
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
          userId
          gameId
          user {
            id
            userName
            description
            email
            game {
              items {
                id
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            updatedAt
          }
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
      gameImage
      gameType
      gameStopString
      gameLink
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
          userId
          gameId
          user {
            id
            userName
            description
            email
            game {
              items {
                id
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
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
                userId
                gameId
                createdAt
                updatedAt
              }
              nextToken
            }
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
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
      gameLocationCity
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
          firstTime
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
        nextToken
      }
      type
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
      gameLocationCity
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
          firstTime
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
        nextToken
      }
      type
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
      gameLocationCity
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
          firstTime
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
        nextToken
      }
      type
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
      gameID
      numberOfPlayers
      teamName
      teamLocation
      gameComments
      gameTotalTime
      completed
      firstTime
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
      gameID
      numberOfPlayers
      teamName
      teamLocation
      gameComments
      gameTotalTime
      completed
      firstTime
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
      gameID
      numberOfPlayers
      teamName
      teamLocation
      gameComments
      gameTotalTime
      completed
      firstTime
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
export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      name
      posts {
        items {
          id
          title
          blog {
            id
            name
            posts {
              items {
                id
                title
                createdAt
                updatedAt
                blogPostsId
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          comments {
            items {
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
            nextToken
          }
          createdAt
          updatedAt
          blogPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
      id
      name
      posts {
        items {
          id
          title
          blog {
            id
            name
            posts {
              items {
                id
                title
                createdAt
                updatedAt
                blogPostsId
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          comments {
            items {
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
            nextToken
          }
          createdAt
          updatedAt
          blogPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
      id
      name
      posts {
        items {
          id
          title
          blog {
            id
            name
            posts {
              items {
                id
                title
                createdAt
                updatedAt
                blogPostsId
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          comments {
            items {
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
            nextToken
          }
          createdAt
          updatedAt
          blogPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      blog {
        id
        name
        posts {
          items {
            id
            title
            blog {
              id
              name
              posts {
                nextToken
              }
              createdAt
              updatedAt
            }
            comments {
              items {
                id
                content
                createdAt
                updatedAt
                postCommentsId
              }
              nextToken
            }
            createdAt
            updatedAt
            blogPostsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          post {
            id
            title
            blog {
              id
              name
              posts {
                nextToken
              }
              createdAt
              updatedAt
            }
            comments {
              items {
                id
                content
                createdAt
                updatedAt
                postCommentsId
              }
              nextToken
            }
            createdAt
            updatedAt
            blogPostsId
          }
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      blogPostsId
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      blog {
        id
        name
        posts {
          items {
            id
            title
            blog {
              id
              name
              posts {
                nextToken
              }
              createdAt
              updatedAt
            }
            comments {
              items {
                id
                content
                createdAt
                updatedAt
                postCommentsId
              }
              nextToken
            }
            createdAt
            updatedAt
            blogPostsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          post {
            id
            title
            blog {
              id
              name
              posts {
                nextToken
              }
              createdAt
              updatedAt
            }
            comments {
              items {
                id
                content
                createdAt
                updatedAt
                postCommentsId
              }
              nextToken
            }
            createdAt
            updatedAt
            blogPostsId
          }
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      blogPostsId
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      blog {
        id
        name
        posts {
          items {
            id
            title
            blog {
              id
              name
              posts {
                nextToken
              }
              createdAt
              updatedAt
            }
            comments {
              items {
                id
                content
                createdAt
                updatedAt
                postCommentsId
              }
              nextToken
            }
            createdAt
            updatedAt
            blogPostsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          post {
            id
            title
            blog {
              id
              name
              posts {
                nextToken
              }
              createdAt
              updatedAt
            }
            comments {
              items {
                id
                content
                createdAt
                updatedAt
                postCommentsId
              }
              nextToken
            }
            createdAt
            updatedAt
            blogPostsId
          }
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      blogPostsId
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        blog {
          id
          name
          posts {
            items {
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
            nextToken
          }
          createdAt
          updatedAt
        }
        comments {
          items {
            id
            post {
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
            content
            createdAt
            updatedAt
            postCommentsId
          }
          nextToken
        }
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        blog {
          id
          name
          posts {
            items {
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
            nextToken
          }
          createdAt
          updatedAt
        }
        comments {
          items {
            id
            post {
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
            content
            createdAt
            updatedAt
            postCommentsId
          }
          nextToken
        }
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        blog {
          id
          name
          posts {
            items {
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
            nextToken
          }
          createdAt
          updatedAt
        }
        comments {
          items {
            id
            post {
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
            content
            createdAt
            updatedAt
            postCommentsId
          }
          nextToken
        }
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
export const createUserGamePlay = /* GraphQL */ `
  mutation CreateUserGamePlay(
    $input: CreateUserGamePlayInput!
    $condition: ModelUserGamePlayConditionInput
  ) {
    createUserGamePlay(input: $input, condition: $condition) {
      id
      userId
      gameId
      user {
        id
        userName
        description
        email
        game {
          items {
            id
            userId
            gameId
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
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
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
            userId
            gameId
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
            createdAt
            updatedAt
          }
          nextToken
        }
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
      userId
      gameId
      user {
        id
        userName
        description
        email
        game {
          items {
            id
            userId
            gameId
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
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
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
            userId
            gameId
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
            createdAt
            updatedAt
          }
          nextToken
        }
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
      userId
      gameId
      user {
        id
        userName
        description
        email
        game {
          items {
            id
            userId
            gameId
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
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
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
            userId
            gameId
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
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
