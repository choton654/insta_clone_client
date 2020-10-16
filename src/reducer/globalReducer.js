export const initialState = {
  user: null,
  users: [],
  posts: [],
  otherPost: null,
  myPosts: null,
  token: null,
  subsUser: null,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, user: action.payload };
    case "LOGIN_USER":
      return {
        ...state,
        token: action.payload.token,
      };
    case "ALL_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "LOGOUT_USER":
      return { ...state, token: null, user: null };
    case "GET_ALL_POSTS":
      return { ...state, posts: action.payload };
    case "POST_CREATED":
      return { ...state, posts: [...state.posts, action.payload] };
    case "POST_LIKED":
      return { ...state, posts: action.payload };
    case "POST_UNLIKED":
      return { ...state, posts: action.payload };
    case "COMMENT_POST":
      return { ...state, posts: action.payload };
    case "POST_DELETE":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "MY_POSTS":
      return {
        ...state,
        myPosts: action.payload,
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.post._id) {
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment._id !== action.payload.comment
              ),
            };
          } else {
            return post;
          }
        }),
      };
    case "OTHER_USER":
      return {
        ...state,
        otherPost: action.payload,
      };
    case "FOLLOW_USER":
      return {
        ...state,
        user: action.payload.loggedUser,
        otherPost: action.payload.otherUser,
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        user: action.payload.loggedUser,
        otherPost: action.payload.otherUser,
      };
    case "ADD_SUBSCRIBERS":
      return {
        ...state,
        subsUser: action.payload,
      };
    case "UPDATE_PIC":
      return {
        ...state,
        user: {
          ...state.user,
          photo: action.payload,
        },
      };
    case "SIGNUP_ERROR" || "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "POST_CREATION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "PHOTO_UPLOAD_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      break;
  }
};
