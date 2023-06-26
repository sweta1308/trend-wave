export const postReducer = (state, { type, payload }) => {
  switch (type) {
    case "POST_LOADING":
      return { ...state, postLoading: payload };
    case "GET_POST":
      return { ...state, post: payload };
    case "USER_POST":
      return { ...state, userPost: payload };
    case "SORT":
      return { ...state, sortBy: payload };
    default:
      return state;
  }
};
