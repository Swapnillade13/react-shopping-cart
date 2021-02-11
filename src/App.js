import React from 'react'
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/products';
import data from './data.json'

// features 1
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: ""
    }
  }

  sortProducts = (event) => {
    //impl
    console.log(event.target.value);
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => (
        sort === "Lowest" ?
          ((a.price > b.price) ? 1 : -1) :
          sort === "Highest" ?
            ((a.price < b.price) ? 1 : -1) :
            ((a._id > b._id) ? 1 : -1)
      ))
    }))

  }

  filterProducts = (event) => {
    //impl
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products
      })
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      })
    }

  }

  addToCart = (product) => {
    
    const cartItems = this.state.cartItems.slice();
    console.log(cartItems)
    let alreadyIncart = false;
    cartItems.forEach((item) => {
      if(item._id === product._id){
        item.count++;
        alreadyIncart = true;
      }
    });
    if(!alreadyIncart) {
      cartItems.push({...product, count : 1})
    }
    this.setState({cartItems})

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

  }

  removeFromCart = (item)=>{
    console.log("Inside the function of remove")
    const cartItems = this.state.cartItems.slice();
    
    this.setState({
      cartItems : cartItems.filter(x=> x._id !== item._id)
    })

    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=> x._id !== item._id)));
  }

  createOrder = (order) => {
    alert("Need to save" + order.name)
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products 
              products={this.state.products}
              addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
                <Cart createOrder={this.createOrder} removeFromCart={this.removeFromCart} cartItems={this.state.cartItems}></Cart>
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }
}

export default App;
