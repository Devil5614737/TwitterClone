import { NextPage } from "next";
import {  useState } from "react";
import RightSideBar from "../components/RightSideBar";
import Sidebar from "../components/Sidebar";
import Timeline from "../components/Timeline";
import  Profile  from "./profile";

const Dashboard: NextPage = () => {

  const [showProfile, setShowProfile] = useState<boolean>(false);


const handleOpenProfile=()=>{
    setShowProfile(true)
}


  return (
    <>
      <div className="container m-auto grid grid-cols-4">
        <Sidebar show={handleOpenProfile} setShowProfile={setShowProfile}/>      
        {showProfile ? <Profile  /> : <Timeline />}
        <RightSideBar />
      </div>

    </>
  );
};

export default Dashboard;
