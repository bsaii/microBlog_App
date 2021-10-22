import React, { createContext, useContext, useReducer } from "react";
import {
  fetchFeed,
  createFeed,
  updateFeed,
  deleteFeed,
  likeFeed,
  signIn,
  signUp,
} from "../utils/apiCalls";
import reducer from "./reducer";

const AppContext = createContext();

const initialState = { feeds: [], loading: false, authData: null };

//here we are using useReducer and useContext to make async logic and data fetching, this can also be done with react-redux and react-thunk--for dispatch
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //a case where when this action is dispatched it takes the data and then updates it to feeds
  //the feeds should return an array of data
  const getFeeds = (data) => {
    dispatch({ type: "FETCH_ALL", payload: data });
  };

  //creating a feed
  const createFeedPost = async (feed) => {
    try {
      const { data } = await createFeed(feed);
      dispatch({ type: "CREATE", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  //update a feed
  const updateFeedPost = async (id, feed) => {
    try {
      const { data } = await updateFeed(id, feed);
      dispatch({ type: "UPDATE", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete a feed
  const deletePostedFeed = async (id) => {
    try {
      await deleteFeed(id);
      dispatch({ type: "DELETE", payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

  //like a feed
  const likePostedFeed = async (id, likeCount) => {
    try {
      const { data } = await updateFeed(id, likeCount);
      dispatch({ type: "LIKE", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  //sign up the user
  // const signup = async (formData, router) => {
  //   try {
  //     const { data } = await signUp(formData);
  //     dispatch({ type: "AUTH", payload: data });
  //     router.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // //sign in the user
  // const signin = async (formData, router) => {
  //   try {
  //     const { data } = await signIn(formData);
  //     dispatch({ type: "AUTH", payload: data });
  //     router.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <AppContext.Provider
      value={{
        ...state,
        getFeeds,
        createFeedPost,
        updateFeedPost,
        deletePostedFeed,
        likePostedFeed,
        // signin,
        // signup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//to use the context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
