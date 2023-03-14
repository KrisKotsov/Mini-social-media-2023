import Loader from "../Loader/Loader";
import Posts from "../Posts/Posts";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const profileData = useAuth();

  if (!profileData) return <Loader isLoading={true} />;

  return (
    <>
      <h1>Profile</h1>
      <p>Name: {profileData.name}</p>
      <p>Username: {profileData.username}</p>
      <p>Email: {profileData.email}</p>
      <p>Phone: {profileData.phone}</p>
      {profileData.id && <Posts userId={profileData.id} />}
    </>
  );
};

export default Profile;
