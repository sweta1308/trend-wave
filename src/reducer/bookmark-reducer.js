export const bookmarkReducer = (state, { type, payload }) => {
  switch (type) {
    case "BOOKMARK_LOADING":
      return { ...state, isBookmarkLoading: payload };
    case "SET_BOOKMARK":
      return { ...state, bookmark: payload };
    default:
      return state;
  }
};
