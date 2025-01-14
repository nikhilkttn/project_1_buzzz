import Suggestion from "../components/rightbar/Suggestion";
import Topbar from "../components/Topbar"
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [followed, setFollowed] = useState(false);

  const {user:currentUser} = useContext(AuthContext);
  const userId = useParams().id;

  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user._id))
  },[currentUser, user._id]);

  useEffect(()=>{
    const fetchUser = async() =>{
      const res = await axios.get(`/users/${userId}`);
      setUser(res.data);
    }
    fetchUser();
  },[userId]);

  const {profilePicture, coverPicture, fname, lname, desc, city, from} = user;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //console.log(followers)     // it shows followers is an array
  //console.log(followers.length)     // but it gives error i dont why

  if(coverPicture==="")
      var cover = PF+"default-cover.jpg";
  else
      var cover = PF+coverPicture;

  if(profilePicture==="")
      var profile = PF+"default-profile.png";
  else
      var profile = PF+profilePicture;


  const followHandler = async () =>{
    try{
      if(followed){
        await axios.put("/users/"+ user._id + "/unfollow", {userId: currentUser._id})
      }
      else{
        await axios.put("/users/"+ user._id + "/follow", {userId: currentUser._id})
      }
    }catch(err){

    }
    setFollowed(!followed);
  }

  return (
    <div className="user-profile-conatiner">
      <Topbar/>

      <div className="user-suggestion-conatiner">
        <div className="user-container">
          <div className="user-profile-cover">
              <img src={cover} alt="" className="user-cover-img" />
              <img src={profile} alt="" className="user-profile-img" />
          </div>
          <div className="user-discription">
            <h2 className="user-profile-name"> {fname +' '+ lname} </h2>
            <h4 className="user-about"> {desc} </h4>
            <p className="user-location"> {from}  &#8226; {city}  &#8226; India  &#8226; 2 friends </p>
          </div>
          <div>

            <button className="user-btns" id="user-add-frnd" onClick={followHandler} >
              <i className="fas fa-user-plus"></i>
              {followed ? "Remove Friend" : "Add Friend"}
            </button>
            <button className="user-btns" id="user-visit-website">
              <i className="fas fa-share-square"></i>
              Visit Website
            </button>

          </div>
        </div>

        <div className="suggestion-div">
          <Suggestion/>
        </div>
      </div>
    </div>
  )
}
export default UserProfile;