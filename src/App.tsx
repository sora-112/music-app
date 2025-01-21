import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import MusicGrid from "./MusicGrid";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MusicGrid />,
    },
  ]);

  const theme = createTheme({
    palette: {},
  });
  return (
    <>
      <NavBar />
      <ThemeProvider theme={theme}>
        <Container>
          <RouterProvider router={router} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
