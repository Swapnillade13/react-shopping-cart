import React from 'react'
import Products from './components/products';
import data from './data.json'

// features 1
class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      products : data.products,
      size : "",
      sort : ""
    }
  }

  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping cart</a>
        </header>
        <main>
          <div className="content">
              <div className="main">
                <Products products={this.state.products}></Products>
              </div>
              <div className="sidebar">
                  side bar cart items
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
