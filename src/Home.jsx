import "./Home.css";
import bgImage from "./assets/pointingbl.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Size of pointingbl.jpg, and where the fingertip is inside it (in image pixels)
const IMG_W = 736;
const IMG_H = 659;
const FINGER_X = 415;
const FINGER_Y = 263; // a little above the fingertip

function Home() {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  // Re-render when the window is resized
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // "background-size: cover" scales the image until it fills the screen...
  const scale = Math.max(width / IMG_W, height / IMG_H);
  // ...and "background-position: center 70%" decides how it's shifted
  const imageLeft = (width - IMG_W * scale) * 0.5;
  const imageTop = (height - IMG_H * scale) * 0.7;

  // So on screen the fingertip is at:
  const fingerLeft = imageLeft + FINGER_X * scale;
  const fingerTop = imageTop + FINGER_Y * scale;

  return (
    <div className="body" style={{ backgroundImage: `url(${bgImage})` }}>
      <button
        className="btn"
        style={{ left: fingerLeft, top: fingerTop }}
        onClick={() => navigate("/lvl1")}
      >
        START
      </button>
    </div>
  );
}

export default Home;
