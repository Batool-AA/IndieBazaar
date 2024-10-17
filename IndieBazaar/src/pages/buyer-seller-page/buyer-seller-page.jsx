import { useNavigate } from "react-router-dom";

import './buyer-seller-page.css'; 

const BuyerSellerPage = () => {

  const navigate = useNavigate();

  const handleBuyer = (e) => {
    navigate("/store");
  }

  const handleSeller = (e) => {
    navigate("/setbusiness");
  }

  return (
    <div className="buyer-seller-page-container">
      <div className="buyer-seller-header-container">
        <h1 className="buyer-seller-header-title">IndieBazaar</h1>
      </div>
      <div className="buyer-seller-buttons-container">

        <button className="button-basic buyer-seller" onClick={handleBuyer}>
          <span role="img" aria-label="buyer">🛍️</span> Buyer
        </button>

        <span>OR</span>

        <button className="button-basic buyer-seller" onClick={handleSeller}>
          <span role="img" aria-label="seller">👨‍💼</span> Seller
        </button>

      </div>
    </div>
  );
}; 

export default BuyerSellerPage;