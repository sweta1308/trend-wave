export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_USER":
      return (state = payload);
    case "ADD_USER":
      return (state = [...state, payload]);
    case "UPDATE_USER":
      return state.map((user) =>
        user._id === payload._id ? { ...payload } : user
      );
    default:
      return state;
  }
};
