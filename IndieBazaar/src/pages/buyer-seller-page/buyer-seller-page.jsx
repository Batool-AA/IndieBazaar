import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./buyer-seller-page.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Navbar from "../../components/navigationbar/navigation";
import mainlogo from "../../assets/logoimage.jpg";

const BuyerSellerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};

  const db = getFirestore();
  const userdb = collection(db, "users");

  // State to manage loading
  const [loading, setLoading] = useState(false);

  const registerUser = async (usertype) => {
    setLoading(true); // Show loading
    try {
      // Add user details to Firestore
      await addDoc(userdb, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        usertype,
      });

      // Register the user in Firebase Authentication
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      console.log("User registered successfully!");

      // Navigate based on user type
      if (usertype === "buyer") {
        navigate("/store");
      } else if (usertype === "seller") {
        navigate("/setbusiness");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("There was an issue with registration. Please try again.");
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <div className="buyer-seller-page-container">
      <div className="buyer-seller-header-container">
        <Navbar title={"IndieBazaar"} logoSrc={mainlogo} />
      </div>
      <div className="buyer-seller-buttons-container">
        {loading ? (
          <div className="loading-spinner">Registering... Please wait.</div>
        ) : (
          <>
            <button
              className="button-basic buyer-seller"
              onClick={() => registerUser("buyer")}
            >
              <span role="img" aria-label="buyer">
                🛍️
              </span>{" "}
              Buyer
            </button>
            <button
              className="button-basic buyer-seller"
              onClick={() => registerUser("seller")}
            >
              <span role="img" aria-label="seller">
                👨‍💼
              </span>{" "}
              Seller
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyerSellerPage;
