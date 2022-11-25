import React, { Component } from 'react'
import Navbar from './components/Navbar'
export default class App extends Component {

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

        })
      })
  }

  componentDidMount() {
    this.fetchCategories()
  }


  render() {
    const { all, clothes, tech, categories } = this.state
    return (
      <Navbar allItems={all.name} clothesName={clothes.name} techName={tech.name} />
    )
  }
}

