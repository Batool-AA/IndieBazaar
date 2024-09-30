import "./slogan.css"
import Handshake from "../../assets/hand-shake.png";
import LeftDesign from "../../assets/bottom-left.png";
import TopDesign from "../../assets/top-right.png";

function Slogan() {
    return (
      <div className="slogan-section">
        <div className="slogan-text">
          <h1>Make a mark with your product</h1>
        </div>
        <div className="slogan-image">
          <img src={Handshake} alt="Handshake" className="slogan-handshake"></img>
        </div>
        <div className="slogan-image">
          <img src={LeftDesign} alt="Left Design" className="slogan-bottom"></img>
        </div>
        <div className="slogan-image">
          <img src={TopDesign} alt="Top Design" className="slogan-top"></img>
        </div>
      </div>
    );
  }
  
  export default Slogan;