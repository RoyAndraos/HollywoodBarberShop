import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Loader from "../float-fixed/Loader";

const Profile = () => {
  const { userInfo } = useContext(UserContext);
  const [userReservations, setUserReservations] = useState({});

  useEffect(() => {
    fetch(`/getReservations/${userInfo._id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserReservations(data);
      });
  }, [userInfo._id]);
  if (!userReservations) {
    return <Loader />;
  }
  console.log(userReservations);
  return <div>Your reservations:</div>;
};

export default Profile;
