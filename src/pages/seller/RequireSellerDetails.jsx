import  { useEffect, useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";
import api from "../../axiosSingleton";

const RequireSellerDetails = () => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null: loading, true/false: decision
  const navigate = useNavigate();

  useEffect(() => {
    const checkSeller = async () => {
      try {
        let response = await api.get("/seller/details", {
          withCredentials: true, // if cookies/auth are needed
        });
        console.log("response ", response);
        console.log("response ", !!response?.data);

        if (response?.data) setIsAuthorized(true);
        else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    checkSeller();
  }, []);

  if (isAuthorized === null) {
    return <p className="text-white">Checking authorization...</p>; // or a spinner
  }
  if (!isAuthorized) {
    navigate("/sellerLogin");
  } else {
    return <Outlet />; // renders nested routes if authorized
  }
};

export default RequireSellerDetails;
