import "./slogan.css"

function Slogan() {
    return (
      <div className="slogan-section">
        <div className="slogan-text">
          <h1>Make a mark with your product</h1>
        </div>
        <div className="slogan-image">
          <img src="../../assets/hand-shake.png" alt="Handshake" className="slogan-handshake"></img>
        </div>
        <div className="slogan-image">
          <img src="../../assets/bottom-left.png" alt="Left Design" className="slogan-bottom"></img>
        </div>
        <div className="slogan-image">
          <img src="../../assets/top-right.png" alt="Top Design" className="slogan-top"></img>
        </div>
      </div>
    );
  }
  
  export default Slogan;