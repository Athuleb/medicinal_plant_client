import React from "react";
import { styled, alpha } from "@mui/material/styles";
import * as Mui from "@mui/material";
import { getDetails } from "../modules/leafList/services";
import { useNavigate } from "react-router-dom";
import { routerList } from "../router/RouterList";
//------------ icons --------------
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  // p: 4,
};
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
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <Mui.IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function SearchBar() {
  const navigateTo = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState({
    open: false,
    details: {},
  });
  const [leafDetails, setLeafDetails] = React.useState();
  React.useEffect(() => {
    getDetails("all").then((data) => {
      setLeafDetails(data);
      console.log(data);
    });
  }, []);
  return (
    <>
      <StyledAutocomplete
        disableCloseOnSelect
        freeSolo
        size="small"
        options={leafDetails?.details || []}
        getOptionLabel={(option) => option?.leafname}
        renderOption={(props, option) => (
          <Mui.ListItem {...props}>
            <Mui.ListItemAvatar>
              <Mui.Avatar
                variant="rounded"
                src={"http://127.0.0.1:8000/" + option?.leafImage}
              />
            </Mui.ListItemAvatar>
            <Mui.ListItemText>{option?.leafname}</Mui.ListItemText>
            <Mui.ListItemIcon>
              <Mui.Tooltip title="Edi leaf details">
                <Mui.IconButton
                  color="primary"
                  onClick={() => {
                    navigateTo(`${routerList.editDetails}/${option.id}`);
                  }}
                >
                  <EditIcon />
                </Mui.IconButton>
              </Mui.Tooltip>
              <Mui.Tooltip title="View leaf details">
                <Mui.IconButton
                  color="success"
                  onClick={() => {
                    setShowDetails({ open: true, details: option });
                  }}
                >
                  <RemoveRedEyeIcon />
                </Mui.IconButton>
              </Mui.Tooltip>
            </Mui.ListItemIcon>
          </Mui.ListItem>
        )}
        renderInput={(props) => (
          <StyledInput
            {...props}
            label="search"
            InputLabelProps={{
              startAdornment: (
                <Mui.InputAdornment position="start">
                  <SearchIcon />
                </Mui.InputAdornment>
              ),
            }}
          />
        )}
      />
      <Mui.Modal
        open={showDetails.open}
        onClose={() => {
          setShowDetails({ open: false, details: {} });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Mui.Box sx={style}>
          <Mui.Card sx={{ maxWidth: 445 }}>
            {/* <Mui.CardActionArea> */}
            <Mui.CardMedia
              component="img"
              height={140}
              width={140}
              image={"http://127.0.0.1:8000/" + showDetails?.details.leafImage}
              alt="green iguana"
            />
            <Mui.CardContent>
              <div className="flex justify-between flex-wrap items-center">
                <Mui.Typography gutterBottom variant="h5" component="div">
                  {showDetails?.details.leafname}
                </Mui.Typography>
                <ExpandMore
                  expand={expanded}
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </div>

              {!expanded ? (
                <Mui.CardContent>
                  <Mui.Typography variant="body2" color="text.secondary">
                    {showDetails?.details?.leafDescription?.slice(0, 100)}{" "}
                    {showDetails?.details?.leafDescription?.length > 100 &&
                      "....."}
                  </Mui.Typography>
                </Mui.CardContent>
              ) : (
                <Mui.Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Mui.CardContent>
                    <Mui.Typography variant="body2" color="text.secondary">
                      {showDetails?.details.leafDescription}
                    </Mui.Typography>
                  </Mui.CardContent>
                </Mui.Collapse>
              )}
            </Mui.CardContent>
            {/* </Mui.CardActionArea> */}
            <Mui.CardActions>
              <Mui.Button
                size="small"
                color="primary"
                onClick={() => {
                  setShowDetails({ open: false, details: {} });
                }}
              >
                close
              </Mui.Button>
            </Mui.CardActions>
          </Mui.Card>
        </Mui.Box>
      </Mui.Modal>
    </>
  );
}

export default SearchBar;
const options = [
  {
    id: 1,
    name: "name 1",
  },
  {
    id: 2,
    name: "name 2",
  },
  {
    id: 3,
    name: "name 3",
  },
  {
    id: 4,
    name: "name 4",
  },
  {
    id: 5,
    name: "name 5",
  },
];
