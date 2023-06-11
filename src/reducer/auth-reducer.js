export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return { ...state, user: payload };
    case "SET_TOKEN":
      return { ...state, token: payload };
    default:
      return state;
  }
};
