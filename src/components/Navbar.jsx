import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import { IoMdCart } from 'react-icons/io'
import { IoLogoUsd } from 'react-icons/io'
import { IoMdArrowDropdown } from 'react-icons/io'
import {IoIosClose} from 'react-icons/io'
import PopUp from "./PopUp"; 

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      all: this.props.allItems,
      clothes: this.props.clothesName,
      tech: this.props.techName,
      curriences: []
    }
  }

  togglePop = () => {
    this.setState({
     seen: !this.state.seen
    });
    setTimeout(function(){
      window.location.reload(1);
      localStorage.clear();
      window.location.href = "http://localhost:3000/";
   }, 1000);
   };


  fetchCurriences() {
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        query: `
        query{
          currencies{
            label
             symbol
          }
        }
        `
      })
    })
      .then(response => response.json())
      .then(data => {
        Object.values(data.data).map(item => {
          this.setState({ curriences: item })
        })
      })
  }

  componentDidMount() {
    this.fetchCurriences()

  }


  render() {
    const { all, clothes, tech, categories, curriences } = this.state

    const onClick = (e) => {
      localStorage.setItem('currency', e.target.id)
      localStorage.setItem('currency-symbol', e.target.textContent.slice(0,2))
      window.location.reload();
    }

    const renderListOfCurriences = (currencies) => {
      return currencies.map(item => <li className='currency-item' key={item.label} onClick={onClick} id={item.label}>{item.symbol} {item.label}</li>)
    }

    let howMany = ''

    if(JSON.parse(localStorage.getItem("prevoiusProductWithAttributes"))){
      howMany = JSON.parse(localStorage.getItem("prevoiusProductWithAttributes")).length;
    }
    
    var howManyProducts = () => {
      if(howMany)
      {
      if(howMany>0){
        return <li className='number-of-cart-item'>{howMany}</li>
      }
    }
    }

    const changeStyle = () =>{
      var cartContent = document.querySelector(".cart-content");
     
      if(cartContent.style.display==='block'){
        cartContent.style.display = 'none'
      }
      else{
        cartContent.style.display = 'block'
      }
    }
    const closeViewCart = () =>{
      var cartContent = document.querySelector(".cart-content");
      cartContent.style.display = 'none'
    }

    const curentCurrency = localStorage.getItem('currency')
    const currencySymbol = localStorage.getItem('currency-symbol')
    var itemAttributes = ''
    var summ = 0
    let quantityElement = 0
    let firstImage = ''
    const allItems = JSON.parse(localStorage.getItem("prevoiusProductWithAttributes"));
    if(allItems){
    var displayItems = JSON.parse(localStorage.getItem("prevoiusProductWithAttributes")).map(item => {
      var images = []
      firstImage = item.obj.gallery[0]
    for(let i=0;i<item.obj.gallery.length;i++){
      images.push(item.obj.gallery[i])
    }
    itemAttributes = item.attr
    quantityElement = itemAttributes.quantity
      if(quantityElement>=1){
      return <div className='displayItem'>
        <div className='attributeItemDiv'>
          <h2 className='ItemName'>{item.obj.name}</h2>
          <div className='galleryItemDiv'>
          <p className='BrandName'>{item.obj.brand}</p>
          <p className='QuantityItem'>{item.attr.quantity}</p>
            <div className='slider-div'>
            <img src={firstImage} width='100px'></img>
          </div>
      </div>
          {item.obj.prices.map(item => {
               if (item.currency.label === curentCurrency) {
                  summ = summ+item.amount;
                  return <span className='priceItem' key={item.currency.id}>{item.currency.symbol}{item.amount}</span>
                }
          })}
          {item.obj.attributes.map(item => {
            return <div className='attributeNameDiv'>
              <h5 className='attributeItemName'>{item.name}:</h5>
              {item.items.map(i => {
                if (i.value.startsWith('#')) {
                  if(i.value===itemAttributes.color){
                    return <span style={{ backgroundColor: i.value, border: '2px solid aqua', backgroundClip: 'content-box', width: '25px', height: '25px'  }} className='attributeColor' key={i.value}></span>
                  }
                  console.log(i.value)
                  return <span style={{ backgroundColor: i.value, width: '20px', height: '20px' }} className='attributeColor' key={i.value}></span>
                } 
                if(i.value===itemAttributes.capacity){
                  return <span  className={item.name} style={{backgroundColor: 'black', color: 'white', width: '40px'}} key={i.value}>{i.value}</span>
                }
                if(i.value===itemAttributes.size){
                  return <span  className={item.name} style={{backgroundColor: 'black', color: 'white', width: '40px'}} key={i.value}>{i.value}</span>
                }
                if(i.value===itemAttributes.usb){
                  return <span  className={item.name} style={{backgroundColor: 'black', color: 'white', width: '40px'}} key={i.value}>{i.value}</span>
                }
                if(i.value===itemAttributes.touchId){
                  return <span  className={item.name} style={{backgroundColor: 'black', color: 'white', width: '40px'}} key={i.value}>{i.value}</span>
                }
                  return <span  className={item.name} style={{ width: '40px'}}key={i.value}>{i.value}</span>
                })
            }
          </div>
      })}
      </div>
     </div>
      }
    })
  }

    return (
      <div className='navbar'>
        <div className='div-text'>
          <ul className='ul'>
            <li className='ul-item'>
              <Link to='/all'>{this.props.allItems}</Link>
            </li>
            <li className='ul-item'>
              <Link to='/clothes'>{this.props.clothesName}</Link>
            </li>
            <li className='ul-item'>
              <Link to='/tech'>{this.props.techName}</Link>
            </li>
          </ul>
        </div>
        <div className='div-icons'>
          <ul className='icons'>
            <li className='icons-item'><IoLogoUsd></IoLogoUsd><IoMdArrowDropdown></IoMdArrowDropdown>
              <div className='dropdown_menu'>
                <ul className='ul-currency'>
                  {renderListOfCurriences(curriences)}
                </ul>
              </div>
            </li>
            <li className='cart-item' onClick={changeStyle}><IoMdCart></IoMdCart></li>
            {howManyProducts()}
            <div className='cart-content'>
            <span className='close' onClick={closeViewCart}><IoIosClose/></span>
              {displayItems}
              <span className='totalPrice'>Total: {currencySymbol}{(summ).toFixed(2)}</span>
              <div className='buttonsCart'>
                <button className='viewBagBtn'><Link to='/cart'>View bag</Link></button>
                <button className='checkOutBtn' onClick={this.togglePop}>Checkout</button>
                <div>
                  {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    )
  }
}
