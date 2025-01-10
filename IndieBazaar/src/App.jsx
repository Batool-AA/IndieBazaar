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
import UserProfile from "./pages/userprofile-page/userprofile"
import EditingBusinesses from "./pages/editing-business-page/editingbusinesspage";
import { UserProvider } from './firebase/usercontext';
import Profilepage from './pages/test/test'
import AddMoreItemsPage from "./pages/addmoreitemspage/addmoreitems-page";
import PrivateRoute from './components/protectedroute/protectedroute'; // Import your PrivateRoute component
import EditItem from './pages/edit-items-page/edit-items-page'

function App () {
  return (
    <>
    <UserProvider>
     <Router>
      <Routes>
        
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/store" element={<CategoriesPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/buyerseller" element={<BuyerSellerPage />} />
        <Route path="/setbusiness" element={<SetupBusiness />} /> 
        <Route path="/business-home/:id" element={<BusinessPage />} />
        <Route path="/business-products" element={<ProductPage />} />
        <Route path="/browse" element={<BrowseBusinesses />} />
        <Route path="/user-profile" element={<PrivateRoute element={<UserProfile />} />} />
        <Route path="/edit-business" element={<PrivateRoute element={<EditingBusinesses />} />} />
        <Route path="/test" element={<Profilepage />} />
        <Route path="/add-more-items" element={<PrivateRoute element={<AddMoreItemsPage />} />} />
        <Route path="/edit-item" element={<PrivateRoute element={<EditItem />} />}/>
        
      </Routes>
    </Router>
    </UserProvider>
    </>
  );
}

export default App;
