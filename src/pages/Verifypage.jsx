import React from 'react'
import Navbar from "../component/Navbar";
import Videobg2 from "../assets/videobg2.mp4";
import "../index.css";  
import Form1 from '../component/Form';
function Verifypage(){
  return (
    <div className="main">
        
        {/* <video className="top-1 z-0" src={Videobg2} autoPlay loop muted/>*/}
        <Navbar />
        <Form1/>
        
    </div>
  )
}

export default Verifypage;