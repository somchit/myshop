import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';
import liff from '@line/liff';

export const CartContext = createContext()

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(CartReducer, initialState)

    const increase = payload => {
        console.log(payload)
        let path = window.location.protocol + '//' + window.location.hostname;// + ':' + window.location.port;
        liff.sendMessages([{
            type: 'text',
            text: "#add ["+payload.name+"] to cart price: ["+payload.price+"] quantity: [1]",
          }]).then(() => {
            liff.sendMessages([{
                type: "image",
                originalContentUrl: path+payload.photo,
                previewImageUrl: path+payload.photo
              }]).then(() => {
                dispatch({type: 'INCREASE', payload})
              });
            
        });
    }

    const decrease = payload => {
        console.log(payload)
        let path = window.location.protocol + '//' + window.location.hostname;// + ':' + window.location.port;
        liff.sendMessages([{
            type: 'text',
            text: "#del ["+payload.name+"] to cart price: ["+payload.price+"] quantity: [1]",
          }]).then(() => {
            liff.sendMessages([{
                type: "image",
                originalContentUrl: path+payload.photo,
                previewImageUrl: path+payload.photo
              }]).then(() => {
                dispatch({type: 'DECREASE', payload})
              });
            
        });
        //dispatch({type: 'DECREASE', payload})
    }

    const addProduct = payload => {
        console.log(payload)
        let path = window.location.protocol + '//' + window.location.hostname;// + ':' + window.location.port;
        liff.sendMessages([{
            type: 'text',
            text: "#addproduct ["+payload.name+"] to cart price: ["+payload.price+"] quantity: [1]",
          }]).then(() => {
            liff.sendMessages([{
                type: "image",
                originalContentUrl: path+payload.photo,
                previewImageUrl: path+payload.photo
              }]).then(() => {
                dispatch({type: 'ADD_ITEM', payload})
              });
            
        });
        //dispatch({type: 'ADD_ITEM', payload})
    }

    const removeProduct = payload => {
        console.log(payload)
        let path = window.location.protocol + '//' + window.location.hostname;// + ':' + window.location.port;
        liff.sendMessages([{
            type: 'text',
            text: "#remove ["+payload.name+"] to cart price: ["+payload.price+"] quantity: [1]",
          }]).then(() => {
            liff.sendMessages([{
                type: "image",
                originalContentUrl: path+payload.photo,
                previewImageUrl: path+payload.photo
              }]).then(() => {
                dispatch({type: 'REMOVE_ITEM', payload})
              });
            
        });
       // dispatch({type: 'REMOVE_ITEM', payload})
    }

    const clearCart = () => {
       // dispatch({type: 'CLEAR'})

        liff.sendMessages([{
            type: 'text',
            text: "#clear",
          }]).then(() => {
            dispatch({type: 'CLEAR'})
          });
    }

    const handleCheckout = () => {
      
            liff.sendMessages([{
                type: 'text',
                text: "#check out",
              }]).then(() => {
                dispatch({type: 'CHECKOUT', state})
              });
            
        
    }

    const contextValues = {
        removeProduct,
        addProduct,
        increase,
        decrease,
        clearCart,
        handleCheckout,
        ...state
    } 

    return ( 
        <CartContext.Provider value={contextValues} >
            { children }
        </CartContext.Provider>
     );
}
 
export default CartContextProvider;
