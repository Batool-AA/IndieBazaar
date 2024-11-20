import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "./firebase"; // Assuming Firebase is configured here
import { query, collection, where, getDocs } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // Start as undefined (loading state)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("email", "==", currentUser.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUser({ uid: currentUser.uid, ...userDoc.data() });
          } else {
            console.error("No user document found for the authenticated email.");
            setUser(null); // No user document found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null); // Handle errors gracefully
        }
      } else {
        setUser(null); // User is signed out
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const user = useContext(UserContext);
  // if (user === undefined) {
  //   throw new Error("useUser must be used within a UserProvider");
  // }
  return user;
};
