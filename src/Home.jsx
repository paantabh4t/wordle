import "./Home.css";
import bgImage from "./assets/pointingbl.jpg";
import { useNavigate } from "react-router-dom";


function Home() {

  const navigate = useNavigate();


  return (
    <div className="body" style={{ backgroundImage: `url(${bgImage})` }}>
      <button className="btn" onClick={() => navigate("/lvl1")}>
          START
      </button>  
    </div>
  );
}

export default Home;
