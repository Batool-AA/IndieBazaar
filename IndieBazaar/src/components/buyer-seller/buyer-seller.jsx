import "./buyer-seller.css"

const BuyerSeller = () => {
    return (
      <div className='buyer-seller-container'>
        <button className="button-basic buyer-seller">
          <span role="img" aria-label="buyer">🛍️</span> Buyer
        </button>
        <span>OR</span>
        <button className="button-basic buyer-seller">
          <span role="img" aria-label="seller">👨‍💼</span> Seller
        </button>
      </div>
    );
  };
  
  export default BuyerSeller;