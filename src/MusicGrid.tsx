import { Box, Paper, PaperTypeMap, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import * as songs from "./data.json";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import { fetchSongs, getSongs } from "./state/MusicSlice";
import MusicPlayer from "./MusicPlayer";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MusicGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    dispatch(fetchSongs(event.target.value));
  };

  const songs = useSelector((state: RootState) => state.music.songs);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSongs(searchTerm));
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="body1">Search Tracks</Typography>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            variant="standard"
            value={searchTerm}
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ m: 4, mt: 5 }}>
        {songs?.length &&
          songs.map((song: any) => {
            return (
              <Grid item xs={4}>
                <Item key={song.trackId} elevation={4}>
                  <Typography variant="h6">{song.trackName}</Typography>
                  <Typography variant="body2">{song.artistName}</Typography>
                  <img src={song.artworkUrl100} alt={song.trackName} />
                  <MusicPlayer songURL={song.previewUrl} />
                </Item>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
