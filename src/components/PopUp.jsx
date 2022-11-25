import React, { Component } from "react";
import './PopUp.scss'
export default class PopUp extends Component {
  handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
   <div className="modal">
     <div className="modal_content">
     <span className="close" onClick={this.handleClick}>&times;</span>
     <p>Thank you for shopping in our store! Your order has been accepted! </p>
    </div>
   </div>
  );
 }
}