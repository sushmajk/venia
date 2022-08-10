import { useReducer } from 'react';

import CheckOutContext from './checkout-context';

const defaultCheckOutState = {
    items: {} ,
};


const checkOutReducer = (state, action) => {
    if (action.type === 'ADD') {
       
        
        const existingCartItem = state.items;

        let updatedItems;
        if (existingCartItem) {
          updatedItems = { ...state.items, ...action.item };

        }else{

          updatedItems = action.item;
        }
        console.log(updatedItems,"formData");
        
        return {
            items: updatedItems,
          };
    }
   

    return defaultCheckOutState;
}
  
  
const CheckOutProvider = (props) => {

    const [cheakOutState, dispatchCheckOutAction] = useReducer(
        checkOutReducer,
        defaultCheckOutState
      );
    const addItemToCartHandler = (item) => {
        dispatchCheckOutAction({ type: 'ADD', item: item });
    };

    
    const checkOutContext = {
        items: cheakOutState.items,
        addItem: addItemToCartHandler,
       
      };

    return (
    <CheckOutContext.Provider value={checkOutContext}>
      {props.children}
    </CheckOutContext.Provider>
    );
};

export default CheckOutProvider;


