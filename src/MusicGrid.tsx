import { Box, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import { fetchSongs } from "./state/MusicSlice";
import MusicPlayer from "./MusicPlayer";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledGrid = styled(Grid)({
  height: "100%",
});

export default function MusicGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const songs = useSelector((state: RootState) => state.music.songs);
  const loading = useSelector((state: RootState) => state.music.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const promise = dispatch(fetchSongs(searchTerm));
    return () => {
      promise.abort();
    };
  }, [searchTerm]);

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
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          songs?.map((song: any) => {
            return (
              <StyledGrid item xs={4}>
                <Item key={song.trackId} elevation={4} sx={{ p: 2 }}>
                  <Typography variant="h6" noWrap={true} sx={{ mb: 0.5 }}>
                    {song.trackName ? song.trackName : song.collectionName}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {song.artistName}
                  </Typography>
                  <div style={{ marginBottom: 10 }}>
                    <img
                      src={song.artworkUrl100.replace("/100x100bb", "/80x80bb")}
                      alt={song.trackName}
                      style={{ borderRadius: 6 }}
                    />
                  </div>
                  <MusicPlayer songURL={song.previewUrl} />
                </Item>
              </StyledGrid>
            );
          })
        )}
      </Grid>
    </>
  );
}
