import React, { useContext } from 'react';
import Layout from '../../components/Layout';

import CartProducts from './CartProducts';
import { CartContext } from '../../contexts/CartContext';
import { formatNumber } from '../../helpers/utils';
import { Link } from 'react-router-dom';




const Cart = () => {

    const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
    
    //useEffect(() => console.log('mounted or updated'));
    // useEffect(() => {
    //     function handleStatusChange(status) {
    //       setIsOnline(status.isOnline);
    //     }
    //     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    //     // Specify how to clean up after this effect:
    //     return function cleanup() {
    //       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    //     };
    //   });

    // useEffect(() => {
    //     return () => {
    //         console.log("xxxxxx")
    //         liff.init({ liffId: '1655374042-Kx6Ld0Zm' })
    //         .then(async () => {
    //             if (!liff.isLoggedIn()) {
    //                 liff.login();
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         });
    //     }
    // }, []);
    // useEffect(()=>{
    //     liff.init({ liffId: '1655374042-Kx6Ld0Zm' })
    //     .then(async () => {
    //       if (!liff.isLoggedIn()) {
    //         liff.login();
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     });
    // })
    return ( 
        <Layout title="Cart" description="This is the Cart page" >
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            cartItems.length > 0 ?
                            <CartProducts/> :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                            </div>
                        }

                        { checkout && 
                            <div className="p-3 text-center text-success">
                                <p>Checkout successfull</p>
                                <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                            </div>
                        }
                    </div>
                    {
                        cartItems.length > 0 && 
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                                <p className="mb-1">Total Payment</p>
                                <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                                <hr className="my-4"/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>CHECKOUT</button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                                </div>

                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </Layout>
     );
}
 
export default Cart;