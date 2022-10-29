export const ADD = "ADD";
export const addOne = () => ({ type: ADD });

export const SUB = "SUB";
export const subOne = () => ({ type: SUB });

export const ADDSOME = "ADDSOME";
export const addSome = value => ({
  type: ADDSOME,
  payload: value,
});

export const CURRPRICE = "CURRPRICE";
export const currprice = value => ({
  type: CURRPRICE,
  value: value,
});

export const RESET = "RESET";
export const reset = () => ({ type: RESET });

export const LIMITBUY = "LIMITBUY";
export const limitbuy = (quantity, price, user) => ({
  type: LIMITBUY,
  quantity: quantity,
  price: price,
  user_id: user,
  // username: username,
});
export const MARKETBUY = "MARKETBUY";
export const marketbuy = (quantity, user) => ({
  type: MARKETBUY,
  quantity: quantity,
  user_id: user,
});

export const LIMITSELL = "LIMITSELL";
export const limitsell = (quantity, price, user) => ({
  type: LIMITSELL,
  quantity: quantity,
  price: price,
  user_id: user,
});
export const MARKETSELL = "MARKETSELL";
export const marketsell = (quantity, user) => ({
  type: MARKETSELL,
  quantity: quantity,
  user_id: user,
});

export const ADDUSER = "ADDUSER";
export const addUser = (name, quantity, fiat, user_id) => ({
  type: ADDUSER,
  name: name,
  quantity: quantity,
  fiat: fiat,
  user_id: user_id,
});

export const UPDATEUSER = "UPDATEUSER";
export const updateuser = (name, quantity, fiat, id) => ({
  type: UPDATEUSER,
  name: name,
  id: id,
  quantity: quantity,
  fiat: fiat,
});
