import Navbar from "../../components/navigationbar/navigation"
import BusinessBanner from "../../components/business-banner/business-banner"
import BusinessInfo from  "../../components/business-info/business-info"
import { useParams } from 'react-router-dom';
import { collection, getDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { db } from "../../firebase/firebase"; // Import your Firestore instance here
import React, { useEffect, useState } from 'react';
import mainlogo from '../../assets/logoimage.jpg';
import "./business-page.css"

const BusinessPage = () => {
    const { id } = useParams(); // Get the business ID from URL parameters
    const [business, setBusiness] = useState(null); // State to hold business data
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const docRef = doc(db, "businesses", id); // Reference to the business document
                const docSnap = await getDoc(docRef); // Fetch the document

                if (docSnap.exists()) {
                    setBusiness({ id: docSnap.id, ...docSnap.data() }); // Set business data to state
                } else {
                    console.log("No such document!"); // Handle case where no document is found
                }
            } catch (error) {
                console.error("Error fetching business: ", error); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBusiness(); // Call fetch function
    }, [id]); // Depend on id to refetch when it changes

    if (loading) return <p>Loading...</p>; // Show loading message while fetching data

    return (
        <div className="business-page-container">
            <Navbar title={"IndieBazaar"} logoSrc={mainlogo}/>
            {business && ( // Render only if business data is available
                <>
                    <BusinessBanner title={business.name} slogan={""} businessId={business.id} path={"/business-products"}/>
                    <div id="about-us">
                        <BusinessInfo businessId={business.id} /> {/* Pass business description */}
                    </div>
                </>
            )}
        </div>
    );
};

export default BusinessPage;