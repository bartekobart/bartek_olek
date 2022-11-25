import React, { Component } from 'react'
import Navbar from './Navbar'
import './All.scss'
import { IoMdCart } from 'react-icons/io'
import { Link } from 'react-router-dom'
export default class Tech extends Component {

  constructor(props) {
    super(props)
    this.state = {
      all: [],
      clothes: [],
      tech: []
    }

  }

  fetchCategories() {
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        query: `
        query{
          categories{
           name
           products{
             id
             name
             inStock
             gallery
             description
             category
             attributes{
               id
               name
               type
               items{
                 displayValue
                 value
                 id
               }
             }
             prices{
               currency{
                 label
                 symbol
               }
               amount
             }
             brand
           }
         }
         }
        `
      })
    })
      .then(response => response.json())
      .then(data => {
        Object.values(data.data).map(item => {
          this.setState({ all: item[0], clothes: item[1], tech: item[2] })
          this.setState({ categories: [item[0].name, item[1].name, item[2].name] })
        })
      })
  }

  componentDidMount() {
    this.fetchCategories()
  }

  render() {
    const { all, clothes, tech, categories } = this.state
    const curentCurrency = localStorage.getItem('currency')


    return (
      <>
        <Navbar allItems={all.name} clothesName={clothes.name} techName={tech.name} />
        <div className='header'>{tech.name}</div>
        <div className='items'>
          {Object.values(tech.products || {}).map((key, item) => {
            return <div key={item} className="item">
              <Link to={`/item/${key.id}`}><img src={key.gallery[0]} alt={key.name} width="400" height="400" className='item-pic' id={key.id}></img></Link>
              <span className='caption'>{key.name}</span>
              {key.prices.map(i => {
                if (curentCurrency == i.currency.label) {
                  return <p className='price' key={i.amount}>{i.currency.symbol}{i.amount}</p>
                }
              })}
              <div className='login'></div>
            </div>
          })}
        </div>
      </>
    )
  }
}