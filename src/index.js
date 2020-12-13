import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';

import { HelmetProvider } from 'react-helmet-async';
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';
import liff from '@line/liff';

class App extends Component {
  componentDidMount() {
    liff.init({ liffId: '1655374042-rm1G3A8M' })
      .then(async () => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <HelmetProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <Routes />
        </CartContextProvider>
      </ProductsContextProvider>
    </HelmetProvider>
    );
  }
}
// ReactDOM.render(
//     <HelmetProvider>
//       <ProductsContextProvider>
//         <CartContextProvider>
//           <Routes />
//         </CartContextProvider>
//       </ProductsContextProvider>
//     </HelmetProvider>,
//   document.getElementById('root')
// );

export default App;

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
