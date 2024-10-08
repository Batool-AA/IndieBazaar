import "./buyer-seller.css"
import { useNavigate } from "react-router-dom";

const BuyerSeller = () => {
  const navigate = useNavigate();

  const handleBuyer = (e) => {
    navigate("/store");
  }

  const handleSeller = (e) => {
    navigate("/setbusiness");
  }

    return (
      <div className='buyer-seller-container'>
        <button className="button-basic buyer-seller" onClick={handleBuyer}>
          <span role="img" aria-label="buyer">🛍️</span> Buyer
        </button>
        <span>OR</span>
        <button className="button-basic buyer-seller" onClick={handleSeller}>
          <span role="img" aria-label="seller">👨‍💼</span> Seller
        </button>
      </div>
    );
  };
  
  export default BuyerSeller;