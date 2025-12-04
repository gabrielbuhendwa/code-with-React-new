import { createContext } from 'react';

// default value for the context
export const CartContext  = createContext({
  items: [],
//   addItem: (item) => {},
//   removeItem: (id) => {},
//   clear: () => {}, 
});