const AuthReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_REGISTER_CHANGE":
      return {
        ...state,
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
        user: action.payload,
        isLoading: false,
      };

    case "CLEAR_USER":
      return {
        ...state,
        user: null,
        isLoading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default AuthReducer;
