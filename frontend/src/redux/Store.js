// Import the necessary tools and functions
import { combineReducers, configureStore } from "@reduxjs/toolkit"; // Tools to create and manage our app's data
import userReducer from "./user/userSlice"; // Import the code that handles user data
import { persistReducer, persistStore } from "redux-persist"; // Tool to save our app's data so it doesn't disappear when we refresh the page
import storage from "redux-persist/lib/storage"; // Uses the browser's local storage to save data // Tool to handle saving and loading the data
import themeReducer from "./theme/themeSlice";

// Combine all the data-handling codes into one
const rootReducer = combineReducers({
  user: userReducer, // Handles data related to the user
  theme: themeReducer,
});

// Set up how we want to save the data
const persistConfig = {
  key: "root", // Name to identify the saved data in storage
  storage, // Use local storage to save the data
  version: 1, // A version number in case we need to update the saved data later
};

// Create a version of our data-handling code that can save data to storage
const persistReducers = persistReducer(persistConfig, rootReducer);

// Create the main data store for our app
export const store = configureStore({
  reducer: persistReducers, // Use the data-handling code that can save data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Skip a specific check to avoid unnecessary warnings
});

// Create a tool to manage saving and loading the data
export const persistor = persistStore(store);
