import React, { Component } from 'react'
import Navbar from './Navbar'

import './Item.scss'

export default class Item extends Component {

  constructor(props) {
    super(props)
    this.state = {
      all: JSON.parse(localStorage.getItem('all')),
      clothes: JSON.parse(localStorage.getItem('clothes')),
      tech: JSON.parse(localStorage.getItem('tech')),
      image: '',
      color: 'white',
    }

  }

  render() {
    const { all, clothes, tech, image, color } = this.state
    const curentCurrency = localStorage.getItem('currency')

    let previousLocalstorage = JSON.parse(localStorage.getItem('prevoiusProductWithAttributes'));
    // localStorage.removeItem("prevoiusProductWithAttributes")
    // localStorage.removeItem("sizes")
    // localStorage.removeItem("idsOfElements")
    // localStorage.removeItem("capacityPS")
    // localStorage.removeItem("capacityPSColor")
    // localStorage.removeItem("sizesBoots")
    // localStorage.removeItem("capacityIphone")
    // localStorage.removeItem("capacityXbox")
    // localStorage.removeItem("colorXbox")
    // localStorage.removeItem("colorIphone")
    // localStorage.removeItem("capacityPS")
    // localStorage.removeItem("capacityImac")
    let previousSizes = JSON.parse(localStorage.getItem('sizes'));
    let previousIdsOfElements = JSON.parse(localStorage.getItem('idsOfElements'));
    let previousPsCapacity = JSON.parse(localStorage.getItem("capacityPS"))
    let previousPsColor = JSON.parse(localStorage.getItem("capacityPSColor"))
    let previousXboxCapacity = JSON.parse(localStorage.getItem("capacityXbox"))
    let previousXboxColor = JSON.parse(localStorage.getItem("colorXbox"))
    let previousIphoneCapacity = JSON.parse(localStorage.getItem("capacityIphone"))
    let previousIphoneColor = JSON.parse(localStorage.getItem("colorIphone"))
    let previousImacCapacity = JSON.parse(localStorage.getItem("capacityImac"))

    
    
   
    const Id = window.location.href.split('/')[4]
    let foundElement = {}

    all.forEach(element => {
      if (element.id === Id) {
        foundElement = element
      }
    });

    const addToCart = (e) =>{

      console.log(foundElement)

      let cartItemWithoutDuplicates = []
      let sizes = []
      let idsOfElements = []
      let capacityPs = []
      let colorPs = []
      let capacityXbox = []
      let colorXbox = []
      let capacityIphone = []
      let colorIphone = []
      let capacityImac = []
      let colorImac = []


      if(previousLocalstorage!==null){
        previousSizes.forEach(e => {
          sizes.push(e)
        })
        previousIdsOfElements.forEach(ele =>{
          idsOfElements.push(ele)
        })
        if(previousPsCapacity){
        previousPsCapacity.forEach(ele =>{
          capacityPs.push(ele)
        })
        previousPsColor.forEach(ele=>{
          colorPs.push(ele)
        })
      }
      if(previousIphoneCapacity){
        previousIphoneCapacity.forEach(ele=>{
          capacityIphone.push(ele)
        })
        previousIphoneColor.forEach(ele=>{
          colorIphone.push(ele)
        })
      }
      if(previousXboxCapacity){
        previousXboxCapacity.forEach(ele=>{
          capacityXbox.push(ele)
        })
        previousXboxColor.forEach(ele=>{
          colorXbox.push(ele)
        })
      }
      if(previousImacCapacity){
        previousImacCapacity.forEach(ele=>{
          capacityImac.push(ele)
        })
      }
      }

      let object = {
        capacity: capacityVar,
        size: sizeVar,
        usb: usbVar,
        touchId: touchIdVar,
        color: colorVar,
        quantity: quantityVar
      }
  
      if(previousLocalstorage){
        for(let i=0;i<previousLocalstorage.length;i++){
          if(previousLocalstorage[i].obj.id !== foundElement.id)
          {
            cartItemWithoutDuplicates.push(previousLocalstorage[i])
            previousIdsOfElements.push(foundElement.id)
          }
          else if((previousLocalstorage[i].obj.id === foundElement.id && previousLocalstorage[i].attr.size !== object.size)){
            if(!sizes.includes(object.size)){
            cartItemWithoutDuplicates.push({
              obj: foundElement,
              attr: object
            })
          }
            cartItemWithoutDuplicates.push(previousLocalstorage[i])
            sizes.push(object.size)
            previousIdsOfElements.push(foundElement.id)
          }
          else if((previousLocalstorage[i].obj.id === foundElement.id && previousLocalstorage[i].attr.capacity !== object.capacity)){
            if(!capacityPs.includes(object.capacity)){
            cartItemWithoutDuplicates.push({
              obj: foundElement,
              attr: object
            })
          }
            cartItemWithoutDuplicates.push(previousLocalstorage[i])
            capacityPs.push(object.capacity)
            previousIdsOfElements.push(foundElement.id)
          }
          else if((previousLocalstorage[i].obj.id === foundElement.id && previousLocalstorage[i].attr.capacity === object.capacity && previousLocalstorage[i].attr.color !== object.color)){
            if(!colorPs.includes(object.color)){
            cartItemWithoutDuplicates.push({
              obj: foundElement,
              attr: object
            })
          }
            cartItemWithoutDuplicates.push(previousLocalstorage[i])
            colorPs.push(object.color)
            previousIdsOfElements.push(foundElement.id)
          }

          else if((previousLocalstorage[i].obj.id === foundElement.id && previousLocalstorage[i].attr.capacity !== object.capacity)){
            if(!capacityXbox.includes(object.capacity)){
            cartItemWithoutDuplicates.push({
              obj: foundElement,
              attr: object
            })
          }
            cartItemWithoutDuplicates.push(previousLocalstorage[i])
            capacityXbox.push(object.capacity)
            previousIdsOfElements.push(foundElement.id)
          }
          else if((previousLocalstorage[i].obj.id === foundElement.id && previousLocalstorage[i].attr.capacity === object.capacity && previousLocalstorage[i].attr.color !== object.color)){
            if(!colorXbox.includes(object.color)){
            cartItemWithoutDuplicates.push({
              obj: foundElement,
              attr: object
            })
          }
            cartItemWithoutDuplicates.push(previousLocalstorage[i])
            colorXbox.push(object.color)
            previousIdsOfElements.push(foundElement.id)
          }

          else if((previousLocalstorage[i].obj.id === foundElement.id && previousLocalstorage[i].attr.capacity !== object.capacity)){
            if(!capacityImac.includes(object.capacity)){
            cartItemWithoutDuplicates.push({
              obj: foundElement,
              attr: object
            })
          }
            cartItemWithoutDuplicates.push(previousLocalstorage[i])
            capacityImac.push(object.capacity)
            previousIdsOfElements.push(foundElement.id)
          }
          else if((previousLocalstorage[i].obj.id === foundElement.id && previousLocalstorage[i].attr.capacity !== object.capacity)){
            if(!capacityIphone.includes(object.capacity)){
            cartItemWithoutDuplicates.push({
              obj: foundElement,
              attr: object
            })
          }
            cartItemWithoutDuplicates.push(previousLocalstorage[i])
            capacityIphone.push(object.capacity)
            previousIdsOfElements.push(foundElement.id)
          }
          else if((previousLocalstorage[i].obj.id === foundElement.id && previousLocalstorage[i].attr.capacity === object.capacity && previousLocalstorage[i].attr.color !== object.color)){
            if(!colorIphone.includes(object.color)){
            cartItemWithoutDuplicates.push({
              obj: foundElement,
              attr: object
            })
          }
            cartItemWithoutDuplicates.push(previousLocalstorage[i])
            colorIphone.push(object.color)
            previousIdsOfElements.push(foundElement.id)
          }
        }

        previousLocalstorage.map((item)=> {
          if(foundElement.id===item.obj.id && 
              object.capacity===item.attr.capacity &&
              object.size===item.attr.size &&
              object.usb===item.attr.usb &&
              object.touchId===item.attr.touchId &&
              object.color===item.attr.color){
            let object2 = {
              capacity: item.attr.capacity,
              size: item.attr.size,
              usb: item.attr.usb,
              touchId: item.attr.touchId,
              color: item.attr.color,
              quantity: item.attr.quantity+1
            }
            cartItemWithoutDuplicates.push({
              obj: foundElement,
              attr: object2
            })
            idsOfElements.push(foundElement.id)
          }
        })
        }
        
      
    if(previousLocalstorage===null){
      cartItemWithoutDuplicates.push({
        obj: foundElement,
        attr: object
      })
      sizes.push(object.size)
      idsOfElements.push(foundElement.id)
      if(foundElement.id === "ps-5"){
        capacityPs.push(object.capacity)
        colorPs.push(object.color)
      }
      if(foundElement.id === "xbox-series-s"){
        capacityXbox.push(object.capacity)
        colorXbox.push(object.color)
      }
      if(foundElement.id === "apple-imac-2021"){
        capacityImac.push(object.capacity)
        colorImac.push(object.color)
      }
      if(foundElement.id === "apple-iphone-12-pro"){
        capacityIphone.push(object.capacity)
        colorIphone.push(object.color)
      }
    }

    if(!idsOfElements.includes(foundElement.id)){
      cartItemWithoutDuplicates.push({
        obj: foundElement,
        attr: object
      })
    }

      localStorage.setItem('capacityPSColor', JSON.stringify(colorPs))
      localStorage.setItem('capacityPS', JSON.stringify(capacityPs))
      localStorage.setItem('colorXbox', JSON.stringify(colorXbox))
      localStorage.setItem('capacityXbox', JSON.stringify(capacityXbox))
      localStorage.setItem('capacityIphone', JSON.stringify(capacityIphone))
      localStorage.setItem('colorIphone', JSON.stringify(colorIphone))
      localStorage.setItem('capacityImac', JSON.stringify(capacityImac))
      localStorage.setItem('idsOfElements',JSON.stringify(idsOfElements))
      localStorage.setItem('sizes',JSON.stringify(sizes))
      localStorage.setItem('prevoiusProductWithAttributes',JSON.stringify(cartItemWithoutDuplicates))
      window.location.reload();
    }

    const onClickImage = (e) => {
      this.setState({ image: e.target.src })
    }

    var capacityVar = ""
    var usbVar =""
    var touchIdVar = ""
    var sizeVar =""
    var colorVar = ""
    var quantityVar = 1

    const onClickOption = (e) => {
      var allCapacity = document.querySelectorAll("p.Capacity");
      var allUsb = document.querySelectorAll("p.With.USB.ports");
      var allTouchId = document.querySelectorAll("p.Touch.ID.in.keyboard")
      var allSize = document.querySelectorAll("p.Size")


     
      if(allCapacity.length>0){
      for(let i=0;i<2;i++){
        allCapacity[i].style.backgroundColor = 'white'
        allCapacity[i].style.color = 'black'
      }
    }

    if(allSize.length>0){
      for(let i=0;i<4;i++){
        allSize[i].style.backgroundColor = 'white'
        allSize[i].style.color = 'black'
      }
    }

    if(allCapacity.length>0&&allTouchId.length>0)
    {
    for(let i=0;i<2;i++){
      allCapacity[i].style.backgroundColor = 'white'
      allCapacity[i].style.color = 'black'
      allUsb[i].style.backgroundColor = 'white'
      allUsb[i].style.color = 'black'
      allTouchId[i].style.backgroundColor = 'white'
      allTouchId[i].style.color = 'black'
    }
  }

      e.target.style.backgroundColor = 'black'
      e.target.style.color = 'white';

      if(allCapacity.length>0 && allTouchId.length>0){
      for(let i=0;i<2;i++){
        if(allCapacity[i].style.backgroundColor ==="black"){
          capacityVar =  allCapacity[i].innerHTML;
        }
        if(allUsb[i].style.backgroundColor ==="black"){
          usbVar = allUsb[i].innerHTML;
        }
        if(allTouchId[i].style.backgroundColor ==="black"){
          touchIdVar = allTouchId[i].innerHTML
        }
      }

      for(let i=0;i<2;i++){
        if(allCapacity[i].innerHTML === capacityVar){
          allCapacity[i].style.backgroundColor ="black"
          allCapacity[i].style.color ="white"
        }
        if(allTouchId[i].innerHTML === touchIdVar){
          allTouchId[i].style.backgroundColor ="black"
          allTouchId[i].style.color ="white"
        }
        if(allUsb[i].innerHTML === usbVar){
          allUsb[i].style.backgroundColor ="black"
          allUsb[i].style.color ="white"
        }
      }
    }

    if(allCapacity.length>0){
      for(let i=0;i<2;i++){
        if(allCapacity[i].style.backgroundColor ==="black"){
          capacityVar =  allCapacity[i].innerHTML;
        }
      }

      for(let i=0;i<2;i++){
        if(allCapacity[i].innerHTML === capacityVar){
          allCapacity[i].style.backgroundColor ="black"
          allCapacity[i].style.color ="white"
        }
      }
    }

    if(allSize.length>0){
      for(let i=0;i<4;i++){
        if(allSize[i].style.backgroundColor ==="black"){
          sizeVar =  allSize[i].innerHTML;
          console.log(allSize[i].innerHTML)
        }
      }

      for(let i=0;i<4;i++){
        if(allSize[i].innerHTML === sizeVar){
          allSize[i].style.backgroundColor ="black"
          allSize[i].style.color ="white"
        }
      }
    }
    }

    let rgb2hex=c=>'#'+c.match(/\d+/g).map(x=>(+x).toString(16).padStart(2,0)).join``

    const onClickChooseColor = (e) => {
      var allColors = document.querySelectorAll("p.attributeColor");
      for (let i = 0; i < allColors.length; i++) {
        allColors[i].style.border = "1px solid black";
        allColors[i].style.backgroundClip = "border-box";
      }
      e.target.style.border = '2px solid aqua'
      e.target.style.backgroundClip = 'content-box'
      colorVar = rgb2hex(`'${e.target.style.backgroundColor}'`).toUpperCase()
    }

    var renderedImage = foundElement.gallery.map(item =>
      <img src={item} width="65" height="65" className='item-rest' id={item.id}  onClick={onClickImage} alt=""></img>
    )

    const sizeAttributes = foundElement.attributes

    var renderedSizes = sizeAttributes.map(item => {
      return <div className='attribute-item'>
        <h5 className='attributeName'>{item.name}:</h5>
        {item.items.map(i => {
          if (i.value.startsWith('#')) {
            return <p style={{ backgroundColor: i.value }} onClick={onClickChooseColor} className='attributeColor' key={i.value}></p>
          }
           return <p onClick={onClickOption} className={item.name} key={i.value}>{i.value}</p>
        })
        }
      </div >
    })

    var renderedPrices = foundElement.prices.map(item => {
      if (item.currency.label === curentCurrency) {
        return <p className='elementPrice' key={item.currency.id}>{item.currency.symbol}{item.amount}</p>
      }
    })

    if (image === '') {
      this.setState({ image: foundElement.gallery[0] })
    }

    return (
      <>
        <Navbar allItems={'ALL'} clothesName={'CLOTHES'} techName={'TECH'} />
        <div className='single-item '>
          <div className='images'>
            {renderedImage}
          </div>
          <div className='image-first'>
            <img src={image} alt={foundElement.name} width="450" height="450" className='item-first' id={foundElement.id}></img>
          </div>
          <div className='attributes'>
            <h4 className='productName'>{foundElement.name}</h4>
            <h5>{foundElement.brand}</h5>
            <div className='sizeDiv'>
              {renderedSizes}
            </div>
            <div className='priceDiv'>
              <h5>PRICE:</h5>
              {renderedPrices}
            </div>
            <div className='buttonDiv'>
              <button onClick={addToCart}>Add to cart</button>
            </div>
            <div className='descriptionDiv' dangerouslySetInnerHTML={{ __html: foundElement.description }}>
            </div>
          </div>
        </div>
      </>
    )
  }
}
