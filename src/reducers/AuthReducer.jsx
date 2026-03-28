const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "HANDLE_REGISTER_CHANGE":
      return {
        ...state,
        isLoading: false,
        registerObj: {
          ...state.registerObj,
          [action.payload.name]: action.payload.value,
        },
      };

    default:
      return state;
  }
};

export default reducer;
