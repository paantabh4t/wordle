import "./Home.css";
import bgImage from "./assets/pointingbl.jpg";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";

// Natural size of pointingbl.jpg and the fingertip's position inside it
const IMG_W = 736;
const IMG_H = 659;
const FINGER_X = 415;
const FINGER_Y = 293;
const LIFT = 30; // raise the button above the fingertip (image pixels)
// Must match background-position in Home.css
const BG_POS_X = 0.5;
const BG_POS_Y = 0.7;
const EDGE = 8; // keep the button this far inside the screen

function Home() {
  const navigate = useNavigate();
  const bodyRef = useRef(null);
  const btnRef = useRef(null);
  const [pos, setPos] = useState(null);

  // Map the fingertip from image space to screen space (background-size: cover)
  useLayoutEffect(() => {
    const body = bodyRef.current;
    const btn = btnRef.current;

    function place() {
      const w = body.clientWidth;
      const h = body.clientHeight;
      const scale = Math.max(w / IMG_W, h / IMG_H);
      const offsetX = (w - IMG_W * scale) * BG_POS_X;
      const offsetY = (h - IMG_H * scale) * BG_POS_Y;
      const fingerX = offsetX + FINGER_X * scale;
      const fingerY = offsetY + (FINGER_Y - LIFT) * scale;

      // Button sits just left of the fingertip, slightly above it
      const bw = btn.offsetWidth;
      const bh = btn.offsetHeight;
      const left = Math.min(Math.max(fingerX - bw - 6, EDGE), w - bw - EDGE);
      const top = Math.min(Math.max(fingerY - bh / 2, EDGE), h - bh - EDGE);
      setPos({ left, top });
    }

    place();
    const observer = new ResizeObserver(place);
    observer.observe(body);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={bodyRef} className="body" style={{ backgroundImage: `url(${bgImage})` }}>
      <button
        ref={btnRef}
        className="btn"
        style={pos ?? { visibility: "hidden" }}
        onClick={() => navigate("/lvl1")}
      >
        START
      </button>
    </div>
  );
}

export default Home;
