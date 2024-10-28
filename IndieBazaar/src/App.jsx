import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from  "./pages/Login-Page/login-page"
import SignUpPage from "./pages/Signup-Page/signup-page"
import BusinessPage from "./pages/Business-Page/business-page"
import BuyerSellerPage from "./pages/buyer-seller-page/buyer-seller-page"
import CategoriesPage from "./pages/categories-page/categoriespage"
import ProductPage from "./pages/products-page/productspage"
import Homepage from "./pages/home-page/homepage"
import SetupBusiness from "./pages/setupbusiness-page/setupbusiness"
import BrowseBusinesses from "./pages/browsebusinesses-page/browsebusinesses"


function App () {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/store" element={<CategoriesPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/buyerseller" element={<BuyerSellerPage />} />
        <Route path="/setbusiness" /> 
        <Route path="/business-home" element={<BusinessPage />} />
        <Route path="/business-products" element={<ProductPage />} />
        <Route path="/business-setup" element={<SetupBusiness/>} />
        <Route path="/browse/:category" element={<BrowseBusinesses />} />
      </Routes>
    </Router>

    </>
  )
}

export default App;