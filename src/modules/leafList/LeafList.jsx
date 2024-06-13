import React from "react";
import * as Mui from "@mui/material";
import * as services from "./services";
import { useNavigate } from "react-router-dom";
import { routerList } from "../../router/RouterList";
import TypingText from "../displayResult/TypingText";
const CustomCard = ({ content }) => {
  const navigateTo = useNavigate();
  const [open, setOpen] = React.useState(false);
  const allDescription =
    content?.description?.medicinalUse + content?.description?.description;
  return (
    <Mui.Card sx={{ maxWidth: 445 }}>
      {/* <Mui.CardActionArea> */}
      <Mui.CardMedia
        component="img"
        sx={{ width: "100%", height: 300, objectFit: "cover" }}
        // height={140}
        // width={140}
        image={content?.image}
        alt="Leaf image"
      />
      <Mui.CardContent>
        <Mui.Typography gutterBottom variant="h5" component="div">
          {content?.name}
        </Mui.Typography>
        {!open && (
          <div className="flex flex-col gap-1">
            <Mui.Typography sx={{ fontWeight: "600" }}>
              Medicinal use
            </Mui.Typography>
            <Mui.Typography variant="body2" color="text.secondary">
              {content?.description?.medicinalUse.slice(0, 78)}
            </Mui.Typography>
          </div>
        )}
        <Mui.Collapse
          in={open}
          className="flex flex-col gap-1"
          timeout="auto"
          unmountOnExit
        >
          <Mui.Typography sx={{ fontWeight: "600" }}>
            Medicinal use
          </Mui.Typography>
          <Mui.Typography variant="body2" color="text.secondary">
            {content?.description?.medicinalUse}
          </Mui.Typography>
          <Mui.Typography sx={{ fontWeight: "600" }}>
            Description
          </Mui.Typography>
          <Mui.Typography variant="body2" color="text.secondary">
            {content?.description?.description}
          </Mui.Typography>
        </Mui.Collapse>
      </Mui.CardContent>
      {/* </Mui.CardActionArea> */}
      <Mui.CardActions>
        <Mui.Button
          size="small"
          color="primary"
          onClick={() => {
            navigateTo(`${routerList.editDetails}/${content.id}`);
          }}
        >
          Edit
        </Mui.Button>
        <Mui.Button
          size="small"
          color="primary"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? "close" : "read more"}
        </Mui.Button>
      </Mui.CardActions>
    </Mui.Card>
  );
};
function LeafList() {
  const [details, setLeafDetails] = React.useState({
    list: [],
    status: "",
  });
  React.useEffect(() => {
    services.getDetails("all").then((data) => {
      if (data.details) {
        setLeafDetails({
          ...details,
          list: data?.details,
        });
      } else {
        setLeafDetails({
          ...details,
          status: data.status,
        });
      }
    });
  }, []);
  return (
    <div className="mt-[10dvh]">
      <Mui.Typography
        variant="h4"
        sx={{ fontWeight: "600" }}
        className="text-center pt-3"
      >
        All leaves
      </Mui.Typography>
      <div className="px-8 mt-8 grid grid-cols-3 gap-3 pb-8">
        {details?.list?.map((item) => (
          <div className="mt-3" key={item?.id}>
            <CustomCard
              content={{
                name: item?.leafname,
                description: JSON.parse(item?.leafDescription || ""),
                image: `http://127.0.0.1:8000/${item.leafImage}`,
                id: item?.id,
              }}
            />
          </div>
        ))}
      </div>
      <Mui.Button
        onClick={() => {
          setShow(!show);
        }}
      >
        show
      </Mui.Button> 

    </div>
  );
}

export default LeafList;
