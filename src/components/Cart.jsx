import React, { Component } from 'react'
import Navbar from './Navbar'
import PopUp from "./PopUp"; 
import SimpleImageSlider from "react-simple-image-slider";
import './Cart.scss'


export default class Cart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      all: [],
      clothes: [],
      tech: [],
      seen: false
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

  render() {

    const curentCurrency = localStorage.getItem('currency')
    const currencySymbol = localStorage.getItem('currency-symbol')

    const allItems = JSON.parse(localStorage.getItem("prevoiusProductWithAttributes"));
    

    var itemAttributes = ''
    var summ = 0
    let quantityElement = 0

    const addClick = (e) => {
      let elementAttribute = JSON.parse(e.target.id)
      let notElement;
      let newElements= []
      allItems.forEach(element=>{
        if(element.attr.capacity === elementAttribute.capacity &&
          element.attr.size === elementAttribute.size &&
          element.attr.touchId === elementAttribute.touchId &&
          element.attr.usb === elementAttribute.usb &&
          element.attr.color === elementAttribute.color){
            notElement = element
          }
      })
      allItems.forEach(element=>{
        if(element !== notElement){
          newElements.push(element)
        }
      })
      newElements.push({
        obj: notElement.obj,
        attr: {
          capacity: notElement.attr.capacity,
          size: notElement.attr.size,
          touchId: notElement.attr.touchId,
          usb: notElement.attr.usb,
          color: notElement.attr.color,
          quantity: notElement.attr.quantity+1
        }
      })
      localStorage.removeItem("prevoiusProductWithAttributes")
      localStorage.setItem("prevoiusProductWithAttributes",JSON.stringify(newElements))
      window.location.reload();
    }


    const removeClick = (e) => {
      let elementAttribute = JSON.parse(e.target.id)
      let notElement;
      let newElements= []
      let newElementsStorage = []
      let newIds = []

      allItems.forEach(element=>{
        if(element.attr.capacity === elementAttribute.capacity &&
          element.attr.size === elementAttribute.size &&
          element.attr.touchId === elementAttribute.touchId &&
          element.attr.usb === elementAttribute.usb &&
          element.attr.color === elementAttribute.color){
            notElement = element
          }
      })
      allItems.forEach(element=>{
        if(element !== notElement){
          newElements.push(element)
        }
      })
      newElements.push({
        obj: notElement.obj,
        attr: {
          capacity: notElement.attr.capacity,
          size: notElement.attr.size,
          touchId: notElement.attr.touchId,
          usb: notElement.attr.usb,
          color: notElement.attr.color,
          quantity: notElement.attr.quantity-1
        }
      })
      
      newElements.forEach(element =>{
        if(element.attr.quantity>=1){
          newElementsStorage.push(element)
        }
      })

      if(notElement.attr.quantity===1){
        let previousIdsOfElements = JSON.parse(localStorage.getItem('idsOfElements'));
        previousIdsOfElements.forEach(ele=>{
          if(ele!==notElement.obj.id){
            newIds.push(ele)
          }
        })
      }

      localStorage.removeItem("prevoiusProductWithAttributes")
      localStorage.removeItem("idsOfElements")
      localStorage.setItem("prevoiusProductWithAttributes",JSON.stringify(newElementsStorage))
      localStorage.setItem("idsOfElements",JSON.stringify(newIds))
      window.location.reload();
    }

    if(allItems.length>=1){
    var displayItems = JSON.parse(localStorage.getItem("prevoiusProductWithAttributes")).map(item => {
      var images = []
    for(let i=0;i<item.obj.gallery.length;i++){
      images.push(item.obj.gallery[i])
    }
    itemAttributes = item.attr
    quantityElement = itemAttributes.quantity
      if(quantityElement>=1){
      return <div className='display-item'>
        <div className='attribute-item-div'>
          <h2 className='name-item'>{item.obj.name}</h2>
          <p className='brand-item'>{item.obj.brand}</p>
          {item.obj.prices.map(item => {
               if (item.currency.label === curentCurrency) {
                  summ = summ+item.amount;
                  return <p className='price-item' key={item.currency.id}>{item.currency.symbol}{item.amount}</p>
                }
          })}
          {item.obj.attributes.map(item => {
            return <div className='attributeNameDiv'>
              <h5 className='attributeName'>{item.name}:</h5>
              {item.items.map(i => {
                if (i.value.startsWith('#')) {
                  if(i.value===itemAttributes.color){
                    return <p style={{ backgroundColor: i.value, border: '2px solid aqua', backgroundClip: 'content-box'  }} className='attributeColor' key={i.value}></p>
                  }
                  console.log(i.value)
                  return <p style={{ backgroundColor: i.value }} className='attributeColor' key={i.value}></p>
                } 
                if(i.value===itemAttributes.capacity){
                  return <p  className={item.name} style={{backgroundColor: 'black', color: 'white'}} key={i.value}>{i.value}</p>
                }
                if(i.value===itemAttributes.size){
                  return <p  className={item.name} style={{backgroundColor: 'black', color: 'white'}} key={i.value}>{i.value}</p>
                }
                if(i.value===itemAttributes.usb){
                  return <p  className={item.name} style={{backgroundColor: 'black', color: 'white'}} key={i.value}>{i.value}</p>
                }
                if(i.value===itemAttributes.touchId){
                  return <p  className={item.name} style={{backgroundColor: 'black', color: 'white'}} key={i.value}>{i.value}</p>
                }
                  return <p  className={item.name} key={i.value}>{i.value}</p>
                })
            }
          </div>
      })}
      </div>

      <div className='gallery-item-div'>
        <div className='buttons-add-remove-item'>
          <button className='plusItem' id={JSON.stringify(itemAttributes)} onClick={addClick}>+</button>
          <p className='howMany'>{quantityElement}</p>
          <button className='minusItem' id={JSON.stringify(itemAttributes)} onClick={removeClick}>-</button>
        </div>
        <div className='slider-div'>
          <SimpleImageSlider
            width={270}
            height={300}
            images={images}
            showNavs={true}
            navStyle={2}
            navMargin={15}
            />
        </div>
      </div>
     </div>
      }
    })
    return (
      <>
        <Navbar allItems={'all'} clothesName={'clothes'} techName={'tech'} />
        <h2 className='title-cart'>CART</h2>
        <div>
            {displayItems}
        </div>
        <div className='summary'>
          <p className='tax'>Tax 21%: {((summ*21)/100).toFixed(2)}</p>
          <p className='quantity'>Quantity: {JSON.parse(localStorage.getItem("prevoiusProductWithAttributes")).length}</p>
          <p className='total'>Total: {currencySymbol}{(summ).toFixed(2)}</p>
          <button className='order-button' onClick={this.togglePop}>Order</button>
          <div className="btn" onClick={this.togglePop}>
          </div>
          {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
        </div>
      </>
    )
  }
  else{
    return (
      <>
      <Navbar allItems={'all'} clothesName={'clothes'} techName={'tech'} />
      <div className='emptyCartDiv'>
        <div className='emptyCartContent'>
          <h2>Your cart is empty!</h2>
        </div>
      </div>
      </>
    )
  }
}
}

