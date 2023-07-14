import { useSelector } from "react-redux"
const Footer = () => {
  const support = require("../footericon/24-hours-support.png")
  const ticketimg=require("../footericon/ticket.png")
  const popcornimg=require("../footericon/popcorn.png")
  const emailimg=require("../footericon/mail.png")
  const youtubeimg=require("../footericon/youtube.png")
  const instagramimg=require("../footericon/instagram.png")
  const twitterimg=require("../footericon/twitter.png")
  const facebookimg=require("../footericon/facebook.png")
  const logo=require("../Icons/mbs_Logo.png")
  let Flag = useSelector((state) => state.SeatSelection.role)
  return (   
    Flag !== "Theater_Admin" &&
    Flag !== "Admin" && 
    <div>
      <div className="container-fluid" style={{padding:0,margin:0}}>
        <footer className="py-5">
        <div >
        <hr></hr>
        <table>
          <tbody>
          <tr>
           <td><img src={logo} style={{width:"100px",marginLeft:"300px", borderRadius: "10px"}} alt="img"></img></td> 
            <td> <img src={support} style={{width:"70px",marginLeft:"120px"}} alt="img"></img></td>
            <td> <img src={ticketimg} style={{width:"70px",marginLeft:"120px"}} alt="img"></img></td>
            <td> <img src={popcornimg} style={{width:"70px",marginLeft:"120px"}} alt="img"></img></td>
            <td> <img src={emailimg} style={{width:"70px",marginLeft:"120px"}} alt="img"></img></td>
          </tr>
          </tbody>
        </table>
          <table>
          <tbody>
          <tr>
            <td> <img src={youtubeimg} style={{width:"40px",marginLeft:"650px"}} alt="img"></img></td>
            <td> <img src={instagramimg} style={{width:"40px",marginLeft:"20px"}} alt="img"></img></td>
            <td> <img src={twitterimg} style={{width:"40px",marginLeft:"20px"}} alt="img"></img></td>   
            <td> <img src={facebookimg} style={{width:"40px",marginLeft:"20px"}} alt="img"></img></td>            
          </tr>
          </tbody>
        </table>
        <hr></hr>
        </div>
         
           <h3></h3>
           
           <p style={{textAlign:"center"}}>&copy; 2022 FlickTicket.com. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
export default Footer;
