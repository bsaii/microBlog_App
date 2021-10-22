const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, feeds: action.payload, loading: true };
    case "CREATE":
      return { ...state, feeds: [...state.feeds, action.payload] }; //to update the data afer a new feed has been created
    case "UPDATE":
      return {
        ...state,
        feeds: state.feeds.map((feed) =>
          feed._id === action.payload._id ? action.payload : feed
        ),
      }; //to update the data based on the id
    case "DELETE":
      return {
        ...state,
        feeds: state.feeds.filter((feed) => feed._id !== action.payload),
      };
    case "LIKE":
      return {
        ...state,
        feeds: state.feeds.map((feed) =>
          feed._id === action.payload._id ? action.payload : feed
        ),
      };
    // case "AUTH": //for signin and signup
    //   localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
    //   return {
    //     ...state,
    //     authData: action.payload,
    //   };
    // case "LOGOUT": //for the logout
    //   localStorage.clear();
    //   return { ...state, authData: null };
    default:
      return state;
  }
};

export default reducer;
