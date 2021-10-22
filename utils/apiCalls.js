import axios from "axios";

// const API_URL = "http://localhost:3000/api/feeds";

const API = axios.create({ baseURL: "http://localhost:3000" });

//fetch all feeds
export const fetchFeed = () => API.get("/api/feeds");

//create a feed
export const createFeed = (newFeed) => API.post("/api/feeds", newFeed);

//update a feed
export const updateFeed = (id, updatedFeed) =>
  API.patch(`/api/feeds/${id}`, updatedFeed);

//delete a feed
export const deleteFeed = (id) => API.delete(`/api/feeds/${id}`);

//signin and signup
// export const signIn = (formData) => API.post("/api/user/signin");
// export const signUp = (formData) => API.post("/api/user/signup");
