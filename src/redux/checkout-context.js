import React from 'react';

const CheckOutContext = React.createContext({
  items: [],
    addItem: (item) => {},
    updateItem: (id) => {},

});

export default CheckOutContext;