import React from 'react'
import Navbar from "../component/Navbar";
import Videobg2 from "../assets/videobg2.mp4";
import "../index.css";
function Verifypage(){
  return (
    <div className="main">
        <video className="top-1" src={Videobg2} autoPlay loop muted/>
        <Navbar />
    </div>
  )
}

export default Verifypage;