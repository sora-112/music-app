import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import songs from "../data.json";

interface MusicState {
  songs: any[];
  loading: boolean;
  error?: string;
}

const initialState: MusicState = {
  songs: [],
  loading: false,
  error: "",
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    getSongs: (state) => {
      state.songs = songs.results;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.fulfilled, (state, action: any) => {
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.songs = [];
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
      });
  },
});

export const fetchSongs = createAsyncThunk(
  "music/fetchSongs",
  async (searchTerm: string) => {
    console.log(searchTerm);
    try {
      const response = await fetch(
        "https://itunes.apple.com/search?" + `term=${searchTerm}&limit=50`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      return error;
    }
  }
);

export const { getSongs } = musicSlice.actions;

export default musicSlice.reducer;
