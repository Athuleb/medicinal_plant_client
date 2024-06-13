import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as Mui from "@mui/material";
import MenuButton from "../components/MenuButton";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
// -------------- icons ------------
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AppsIcon from '@mui/icons-material/Apps';
const StyledAutocomplete = styled(Mui.Autocomplete)(({ theme }) => ({
  width: 250,
  borderColor: theme.palette.common.white,
  backgroundColor: theme.palette.success.main,
  "&:focus": {
    width: 250,
  },
  transition: theme.transitions.create("width"),
}));
const StyledInput = styled(Mui.TextField)(({ theme }) => ({
  width: "100%",
  border: 0,
  "& label.Mui-focused": {
    color: theme.palette.common.white,
  },
  "&.Mui-focused fieldset": {
    borderColor: theme.palette.common.white,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.common.white,
    },
  },
}));

function MainLayout() {
  const navigate = useNavigate()
  const [mode, setMode] = React.useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: mode ? "light" : "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Mui.AppBar
        position="fixed"
        sx={{ bgcolor: (theme) => theme.palette.background.paper }}
      >
        <Mui.Toolbar>
          <Mui.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div
              className="text-green-700 font-bold flex flex-row gap-2 uppercase text-lg items-center"
              style={{ fontFamily: "'Outfit', sans-serif;" }}
            >
              Leaf detection{" "}
              <Mui.Avatar src="../../public/icons/titleIcon.webp" height={8} width={8} />
            </div>
          </Mui.Typography>
          <Mui.Box className="flex gap-3">
           
           <Mui.Tooltip title="Back to home page">
           <Mui.IconButton onClick={()=>{navigate('')}}>
              <HomeIcon/>
            </Mui.IconButton>
           </Mui.Tooltip>
            <MenuButton>
            <Mui.MenuItem onClick={()=>{navigate('/detection')}}>
                <Mui.ListItem>
                  <Mui.ListItemIcon>
                    <DocumentScannerIcon/>
                  </Mui.ListItemIcon>
                  <Mui.ListItemText>
                     Detect a leaf
                  </Mui.ListItemText>
                </Mui.ListItem>
              </Mui.MenuItem>
            <Mui.MenuItem onClick={()=>{navigate('/all-leaf')}}>
                <Mui.ListItem>
                  <Mui.ListItemIcon>
                    <AppsIcon/>
                  </Mui.ListItemIcon>
                  <Mui.ListItemText>
                     All leaf details
                  </Mui.ListItemText>
                </Mui.ListItem>
              </Mui.MenuItem>
            <Mui.MenuItem onClick={()=>{navigate('/edit-details/all')}}>
                <Mui.ListItem>
                  <Mui.ListItemIcon>
                    <ListAltIcon/>
                  </Mui.ListItemIcon>
                  <Mui.ListItemText>
                     Add or edit details
                  </Mui.ListItemText>
                </Mui.ListItem>
              </Mui.MenuItem>
              <Mui.Divider/>
              <Mui.MenuItem
                onClick={(e) => {
                  setMode(!mode);
                }}
              >
                <Mui.ListItem>
                  <Mui.ListItemIcon>
                    {mode ? <NightlightIcon /> : <LightModeIcon />}
                  </Mui.ListItemIcon>
                  <Mui.ListItemText>
                    {mode ? "Dark mode" : "Light mode"}
                  </Mui.ListItemText>
                </Mui.ListItem>
              </Mui.MenuItem>
            </MenuButton>
            <SearchBar/>
          </Mui.Box>
        </Mui.Toolbar>
      </Mui.AppBar>
      <section>
        <Outlet />
      </section>
    </ThemeProvider>
  );
}

export default MainLayout;
// https://static.vecteezy.com/system/resources/previews/010/852/913/original/leaf-icon-vector-png.png

