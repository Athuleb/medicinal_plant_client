import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { styled, useTheme } from "@mui/system";
import TypingText from "./TypingText";
// --------------- icon -----------------
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
const StyledScrollableBox = styled(Mui.Box)(
  ({ theme }) => `
    min-height: 27vh;
    max-height: 37vh;
    width: 95%;
    overflow: auto;

    /* Styles for the scrollbar in WebKit browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${
        theme.palette.mode === "dark" ? "#121212" : "#ffffff"
      };
    }

    /* Styles for the scrollbar in Firefox */
    scrollbar-color: #888 ${
      theme.palette.mode === "dark" ? "#121212" : "#ffffff"
    };
    scrollbar-width: thin;
  `
);
function ShowResult({ loading, leaf }) {
  const theme = useTheme();
  const [description, setDescription] = React.useState([]);
  const [currentIndex, setCurrentIndex] =React.useState(0);
  React.useEffect(() => {
    const parsedData = JSON.parse(
      leaf?.leafDescription || JSON.stringify({ msg: "No data" })
    );
    const resultArray = parsedData?.msg ? [] : [
      {
        title:"Medicinal use",
        desc:parsedData?.medicinalUse
      },
      {
        title:"Description",
        desc:parsedData?.description
      },
    ]
    setDescription(resultArray)
  }, [leaf]);
  return (
    <div className="px-3 pt-[11vh] flex flex-col items-center justify-center gap-4 max-h-[98vh] overflow-auto">
      {loading ? (
        <>
          <Mui.Skeleton
            animation="wave"
            variant="rounded"
            width="95%"
            height="50dvh"
          />
          <div className="flex flex-col gap-3 w-[95%] ">
            <Mui.Skeleton animation="wave" variant="rounded" width="40%" />
            {Array.from({ length: 7 }).map((_, index) => (
              <Mui.Typography key={index} variant="caption">
                <Mui.Skeleton animation="wave" variant="rounded" />
              </Mui.Typography>
            ))}
          </div>
        </>
      ) : (
        <>
          <Mui.Avatar variant="rounded" src={`http://127.0.0.1:8000/${leaf?.leafImage}`} sx={{ width: "95%", height: "50dvh" }}>
            <PhotoSizeSelectActualIcon sx={{ width: "60%", height: "60%" }} />
          </Mui.Avatar>
          <strong className="text-3xl">{leaf?.leafname}</strong>
          <StyledScrollableBox>
            {
              description.map((result,index)=>(
                <React.Fragment key={index}>
                  <Mui.Typography className="border-b-2 w-fit pb-2" sx={{fontWeight:"700"}} variant='h6'>{result.title}</Mui.Typography>
                  <TypingText text={result.desc} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                </React.Fragment>
              ))
            }
          </StyledScrollableBox>
        </>
      )}
    </div>
  );
}

export default ShowResult;
