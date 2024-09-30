import BuyerSeller from '../../components/buyer-seller/buyer-seller.jsx';
import Header from '../../components/header/header.jsx';

import './buyer-seller-page.css'; // Import the buyer-seller-page CSS

const BuyerSellerPage = () => {
  return (
    <div className="buyer-seller-page-container">
      <Header />
      <div className="buyer-seller-buttons-container">
        <BuyerSeller />
      </div>
    </div>
  );
};

export default BuyerSellerPage;