export const addToCartSuccess = product => {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
};

export const updateAmountSuccess = (id, amount)=>{
  return{
    type: '@cart/UPDATE_SUCCESS',
    id,amount
  }
}

export const deleteSuccess =(id)=>{
  return {
    type: '@cart/DELETE_SUCCESS',
    id
  }
}