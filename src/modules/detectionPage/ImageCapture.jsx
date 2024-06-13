import React, { useState, useRef, useEffect } from "react";
import { sendImage, getLeafDetails } from "../../services/services";
import * as Mui from "@mui/material";
import { findHighFrequencyElemet } from "../../utils/arrayOperations";
import ShowResult from "../displayResult/ShowResult";
// import axios from 'axios';
let finalResult = [];
const ImageCapture = ({ open }) => {
  const [loading, setLoading] = useState({
    status: false,
    percentage: 0,
    buffer: 0,
    isImageMoved: false,
  });
  // const [resultData, setResultData] = useState([]);

  const [leaf, setLeaf] = useState({});
  const [callFunction, setCallFuction] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);
  const [startStop, setStartStop] = useState("");

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };
  function fetchLeafDetails(leafName) {
    getLeafDetails(leafName).then((data) => {
      console.log("data-----------------------------", data);
      setLeaf(data.details[0]);
    });
  }
  const handleCaptureImages = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    let images = [];
    let imageData = null;
    for (let i = 0; i < 1; i++) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      imageData = canvas.toDataURL("image/jpeg");
      images.push(imageData);
    }
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image, index) => {
        const blob = dataURLtoBlob(image);
        formData.append("image", blob, `image${index}.jpg`);
        // console.log(resultData);
        formData.append("previous_result", JSON.stringify([]));
      });
      sendImage(formData).then((result) => {
        if (result.message[0]) {
          if (finalResult.length == 10) {
            const result = findHighFrequencyElemet(finalResult);
            fetchLeafDetails(result);
            finalResult = [];
            setLoading({
              percentage: 0,
              buffer: 0,
              status: false,
              isImageMoved: false,
            });
          } else {
            result.message?.length == 1
              ? finalResult.push(result.message[0])
              : (finalResult = []);
            setLoading({
              percentage: finalResult.length * 10,
              buffer: finalResult.length * 10 - 10,
              status: true,
              isImageMoved: false,
            });
          }
        } else {
          setLoading({
            ...loading,
            isImageMoved: true,
          });
        }
      });
    }
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopVideo = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
      setVideoStream(null);
    }
  };

  function handleDetection() {
    setStartStop("Detection started");
    const interavelId = setInterval(() => {
      handleCaptureImages();
    }, 1000);
    const interavelIds = [...callFunction, interavelId];
    setCallFuction(interavelIds);
    console.log("started");
  }

  
  function handleStopDetection() {
    setLeaf({});
    setStartStop("");
    setLoading({
      percentage: 0,
      isImageMoved: false,
      buffer: false,
      status: false,
    });
    callFunction.forEach((intervelId) => {
      clearInterval(intervelId);
    });
    setCallFuction([]);
  }
  useEffect(() => {
    startVideo();
    return () => {
      if (!open) {
        if (videoStream) {
          videoStream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-4 pt-[11vh] px-4">
        <div
          className="h-[50vh] w-[100%] bg-zinc-700 drop-shadow-lg rounded"
          style={{ position: "relative" }}
        >
          <video
            ref={videoRef}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="rounded drop-shadow-lg"
            autoPlay
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
        <div className="flex gap-2">
          <Mui.Button variant="contained" onClick={handleDetection}>
            {startStop != "" ? "Detecion is on going " : "Detect image"}
          </Mui.Button>
          <Mui.Button
            color="error"
            variant="contained"
            onClick={handleStopDetection}
          >
            stop detection
          </Mui.Button>
          <div>
            {loading.status && (
              <Mui.Typography variant="h6" color="GrayText">
                Please don't move the object Detectig {loading.percentage} %
                <Mui.LinearProgress
                  variant="buffer"
                  value={loading.percentage}
                  valueBuffer={loading.buffer}
                />
              </Mui.Typography>
            )}
          </div>
        </div>
      </div>
      <ShowResult
        leaf={leaf}
        content={[
          { type: "title", desc: "Name" },
          {
            type: "desc",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati facilis voluptates excepturi adipisci. Ullam inventore recusandae cumque cum iusto necessitatibus accusantium, ipsum eius ipsam sapiente aut, voluptate totamveniam architecto?",
          },
        ]}
      />
    </div>
  );
};

export default ImageCapture;
