import React from "react";
import * as Mui from "@mui/material";
import { useNavigate } from "react-router-dom";
import RevealOnScroll from "../../components/RevelOnScroll";
// ---------- icons ----------------
import InfoIcon from "@mui/icons-material/Info";
const card = (image, desc, heading) => {
  return (
    <Mui.Paper elevation={3} className="p-3 ">
      <div className="h-[24ch] grid grid-cols-3 gap-2">
        <div className="p-2">
          {" "}
          <img width={100} height={80} src={image} alt="" />
        </div>
        <div className="col-span-2 border-s-2 ps-6 pt-3">
          <Mui.Typography sx={{ fontSize: "1.7rem", fontWeight: "700" }}>
            {heading}
          </Mui.Typography>
          {desc}
        </div>
      </div>
    </Mui.Paper>
  );
};

function LandingPage() {
  const navigateTo = useNavigate();
  return (
    <>
      <header
        style={{ backgroundImage: "url(images/headerImage.jpg)" }}
        className="h-[100dvh] grid grid-cols-2"
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <Mui.Typography
            variant="h4"
            sx={{ fontWeight: "700", width: "70%" }}
            className="text-white"
          >
            Medicinal plant detection using deep learning
          </Mui.Typography>
          <p className="text-center text-white px-10">
            Dive into the future of herbal exploration with our real-time
            medicinal plant detection webpage. Uncover the secrets of nature's
            pharmacy at your fingertips, as our advanced technology empowers you
            to identify and learn about medicinal plants instantly. Whether you
            are a botanist, herbalist, or simply a nature enthusiast, our
            platform opens a window to the extraordinary healing properties of
            the plant kingdom. Experience the beauty of seamless integration
            between science and nature, as we bring you a unique and informative
            journey through the world of botanical wonders.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <Mui.Button
            onClick={() => {
              navigateTo("/detection");
            }}
            sx={{
              color: "white",
              borderColor: "white",
              width: "40%",
              paddingY: "20px",
            }}
            variant="outlined"
          >
            Try it out
          </Mui.Button>
        </div>
      </header>
      <main className="pt-20 px-24 pb-24 mt-4 flex flex-col gap-3">
        <RevealOnScroll>
          <Mui.Typography variant="h4" className="pb-5">
            About <InfoIcon fontSize="2.5rem" />
          </Mui.Typography>
          <Mui.Typography
            className="py-10 border-y-2 mb-4"
            sx={{
              fontSize: "1rem",
              lineHeight: "2rem",
              textAlign: "justify",
              marginTop: "10px",
            }}
          >
            Medicinal plants have been a source of healing and wellness for
            centuries, yet many people today lack awareness of these valuable
            natural resources and their potential uses. Identifying medicinal
            plants can be a challenging and time-consuming task, often requiring
            expert knowledge. Our web application transcends mere
            identification; it serves as an inclusive platform, not only
            revealing the plants' identities but also shedding light on their
            historical, cultural, and contemporary applications. In this
            project, we introduce a novel approach to address this issue by
            developing a real-time web application powered by deep learning.
            real-time web application leverages the capabilities of deep
            learning to provide instantaneous and accurate results for various
            tasks, from image recognition to data analysis. Powered by advanced
            neural networks, it offers users a seamless and efficient
            experience, making complex tasks feel effortless. Our system is
            designed to identify medicinal plants and provide information about
            their uses in real-time. To tackle this challenge, we introduce a
            pioneering solution: specifically, Convolutional Neural Networks
            (CNN) in image recognition and data analysis. The purpose of this
            web application is to make valuable information about medicinal
            plants more accessible to the general public. Beyond mere
            identification, our web application goes a step further by offering
            insightful awareness of usage. For each recognized plant, users
            receive detailed information about its botanical classification,
            medicinal properties, historical uses, preparation methods, and
            potential side effects or precautions. This comprehensive knowledge
            empowers individuals to make informed decisions about the
            utilization of medicinal plants for various health and wellness
            purposes. This project aims to bridge the knowledge gap surrounding
            medicinal plants, making this valuable information more accessible
            to the general public.
          </Mui.Typography>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="h-[30dvh] flex justify-center items-center">
            <div onClick={()=>{navigateTo("/all-leaf")}} className="animate-bounce  rounded-full transition ease-in-out delay-150 border px-8 py-4 font-light text-[2rem] uppercase text-green-600 border-green-600 cursor-pointer hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-green-600 hover:text-white">
              all leaves
            </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="grid grid-cols-2 gap-3 mb-16">
            {card(
              "images/Tensorflow.png",
              '" TensorFlow Empowering seamless integration of advanced machine learning models on our website for unparalleled innovation and transformative experiences"',
              "Tensorflow"
            )}
            <div className="ps-2">
              <Mui.Typography
                sx={{ fontSize: "2rem", fontWeight: "700" }}
                className="pb-3"
              >
                Tensorflow
              </Mui.Typography>
              TensorFlow, a powerful and open-source machine learning library,
              takes center stage on our ML website. Developed by the Google
              Brain team, TensorFlow empowers developers and data scientists to
              build and deploy machine learning models with ease. Its flexible
              architecture allows for seamless experimentation, efficient
              deployment, and scalability, making it an ideal choice for a wide
              range of applications. Dive into the world of machine learning
              with TensorFlow, where innovation meets accessibility, unlocking
              the potential for cutting-edge solutions and transformative
              experiences on our platform.
            </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="grid grid-cols-2 gap-3 my-16">
            <div className="pe-2">
              <Mui.Typography
                sx={{ fontSize: "2rem", fontWeight: "700" }}
                className="pb-3"
              >
                Meachine learning
              </Mui.Typography>
              The captivating world of machine learning unfolds. Whether you're
              a seasoned data scientist, a curious learner, or a tech
              enthusiast, our blog is your gateway to the latest insights,
              trends, and innovations in the realm of machine learning. From
              deep dives into groundbreaking algorithms to practical tips for
              model deployment, we aim to demystify the complexities of ML. Join
              us on a journey of discovery, where each blog post is crafted to
              inspire, educate, and spark meaningful conversations within the
              thriving community of machine learning enthusiasts.!
            </div>
            {card(
              "images/ml.png",
              '" Machine learning, the art of empowering computers to learn from data and make intelligent decisions, is revolutionizing industries and shaping the future of technology. "',
              "Meachine learning"
            )}
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="grid grid-cols-2 gap-3 my-16">
            {card(
              "images/image-detection.png",
              '"Image detection, a powerful application of computer vision, enables machines to interpret visual data, fostering advancements in areas like security, healthcare, and autonomous systems."',
              " Image detection"
            )}
            <div className="ps-2">
              <Mui.Typography
                sx={{ fontSize: "2rem", fontWeight: "700" }}
                className="pb-3"
              >
                Image detection
              </Mui.Typography>
              The intricacies of cutting-edge technologies that power
              intelligent image recognition systems. Whether you're a seasoned
              professional, a curious developer, or an enthusiast eager to delve
              into the world of artificial intelligence. Explore articles that
              demystify complex algorithms, discuss breakthroughs in
              convolutional neural networks (CNNs) and recurrent neural networks
              (RNNs), and showcase real-world applications of deep learning in
              image detection. Stay abreast of the latest trends, emerging
              techniques, and practical tips that empower you to navigate the
              evolving landscape of deep learning for image analysis.
            </div>
          </div>
        </RevealOnScroll>
      </main>
    </>
  );
}

export default LandingPage;
