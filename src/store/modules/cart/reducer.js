export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS': {
      const { product } = action;

      const productIndex = state.findIndex(p => +p.id === +product.id)
      if (productIndex < 0) {
        return [...state, { ...product, amount: 1 }]


      } else {

        const productNewState = state.map(p => {
          if (p.id === product.id) {
            return {
              ...p,
              amount: p.amount + 1
            }
          } else {
            return p
          }
        })
        return productNewState;

      }
    }
    case '@cart/UPDATE_SUCCESS': {
      const { id, amount } = action;
      if (amount <= 0) return state;

      const productNewState = state.map(p => {
        if (p.id === id) {
          return {
            ...p,
            amount: amount
            
          }
        } else {
          return p
        }
      })
      return productNewState;
    }
    case '@cart/DELETE_SUCCESS': {
      const { id } = action;
      const newState = state.filter(p => p.id !== id);
      return newState;
    }

    default:
      return state;
  }
}
