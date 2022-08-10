import React from 'react';
import "./filterMenu.scss";

export default function FilterMenu(props) {
    function openNav() {
        document.getElementById("mySidepanel").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidepanel").style.width = "0";
      }

  return (
    <>
    <a className="Filter-sort"  onClick={openNav}>
        <img className="icon"  src={process.env.PUBLIC_URL + `/assets/icons/sliders.png`} alt="profile icon"/>
    Filter Results</a> 
    <div id="mySidepanel" class="sidepanel">
        <a href="#" class="closebtn" onClick={closeNav}>×</a>
            <p>Attribute</p>
            {props.categoryNames}
        <div className="divider"></div>
            <p>Color</p>
            <a href="#" className="btn btn-black"></a>
            <a href="#" className="btn btn-white"></a>
            <a href="#" className="btn btn-darkGreen"></a>
            <a href="#" className="btn btn-yellow"></a>
            <a href="#" className="btn btn-blue"></a>
            <a href="#" className="btn btn-red "></a>
            <a href="#" className="btn btn-darkBlue"></a>
            <a href="#" className="btn btn-pink"></a>
            <a href="#" className="btn btn-orange"></a>
            <a href="#" className="btn btn-rainbow"></a>
       </div>
    </>
  )
}
