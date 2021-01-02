import React, {useState, useEffect} from "../web_modules/react.js";
import {load, convertToGif} from "./utils/ffmpeg.js";
import {FormDynamic} from "./components/FormDynamic.js";
const App = () => {
  const inputs = [
    {name: "initial", type: "number", label: "Initial", value: "0", props: {min: 0, max: 100}},
    {name: "duration", type: "number", label: "Duration", value: "0", props: {min: 0, max: 100}}
  ];
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  useEffect(() => {
    (async () => {
      const isLoad = await load();
      console.log(isLoad);
      setReady(isLoad);
    })();
  }, []);
  const handleResetVideo = () => {
    setVideo(null);
    setGif(null);
  };
  const handleOnChangeInputVideo = (e) => setVideo(e.target.files?.item(0));
  const handleOnLoadData = (e) => inputs.map((input) => input.props.max = parseInt(e.target.duration));
  const fileDownload = () => {
    const a = document.createElement("a");
    a.href = gif;
    a.download = "prueba.gif";
    a.click();
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "title"
  }, "VideoToGif"), /* @__PURE__ */ React.createElement("div", {
    className: "container__video"
  }, !ready && /* @__PURE__ */ React.createElement("img", {
    className: "loading",
    src: "assets/loading.gif"
  }), ready && video && !gif && /* @__PURE__ */ React.createElement("video", {
    controls: true,
    src: URL.createObjectURL(video),
    onLoadedData: handleOnLoadData
  }), ready && !video && /* @__PURE__ */ React.createElement("div", {
    className: "video-input"
  }, /* @__PURE__ */ React.createElement("input", {
    id: "video-input",
    hidden: true,
    type: "file",
    onChange: handleOnChangeInputVideo
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "video-input"
  }, "Choose video")), gif && /* @__PURE__ */ React.createElement("div", {
    className: "image"
  }, /* @__PURE__ */ React.createElement("img", {
    src: gif
  }))), ready && video && /* @__PURE__ */ React.createElement("div", {
    className: "container__form"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "btn-reset",
    onClick: handleResetVideo
  }, "Reset Video"), gif && /* @__PURE__ */ React.createElement("button", {
    className: "btn-download",
    onClick: fileDownload
  }, "Download"), !gif && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormDynamic, {
    inputs,
    onSubmit: async (values) => {
      const gifUrl = await convertToGif({...values, video});
      setGif(gifUrl);
    },
    titleSubmit: "Convert"
  }))));
};
export default App;
