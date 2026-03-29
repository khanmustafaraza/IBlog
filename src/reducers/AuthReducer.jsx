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
    case "HANDLE_LOGIN_CHANGE":
      return {
        ...state,
        loginObj: {
          ...state.loginObj,
          [action.payload.name]: action.payload.value,
        },
      };
    case "SET_USER":
      return {
        ...state,
        user: {
          token: action.payload.token,
          user: action.payload.user,
        },
      };

    default:
      return state;
  }
};

export default reducer;
