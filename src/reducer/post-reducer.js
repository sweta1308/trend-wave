export const postReducer = (state, { type, payload }) => {
  switch (type) {
    case "POST_LOADING":
      return { ...state, postLoading: payload };
    case "GET_POST":
      return { ...state, post: payload };
    default:
      return state;
  }
};
