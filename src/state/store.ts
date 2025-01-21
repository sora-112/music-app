import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./MusicSlice";

export const store = configureStore({
  reducer: {
    music: musicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
