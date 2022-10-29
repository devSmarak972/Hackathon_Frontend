import {
  MARKETBUY,
  MARKETSELL,
  LIMITBUY,
  LIMITSELL,
  CURRPRICE,
  ADDUSER,
  UPDATEUSER,
} from "../actions/count.actions";

const CountReducer = (
  state = { buy: [], sell: [], users: [], curr_price: 0, transaction: [] },
  action
) => {
  switch (action.type) {
    case MARKETSELL:
      var buynew = state.buy.map(a => {
        return { ...a };
      });
      var modusers = state.users.map(a => {
        return { ...a };
      });
      var sellInd = modusers.findIndex(
        user => parseInt(user.user_id) === parseInt(action.user_id)
      );

      var quantity = action.quantity;

      var i = 0;
      var trans = state.transaction.map(a => {
        return { ...a };
      });

      for (i = 0; i < buynew.length; i++) {
        // console.log(buynew[i], quantity, "marketloop");
        if (sellnew[i].user_id === action.user_id) continue;
        if (quantity >= buynew[i].quantity) {
          var buyInd = modusers.findIndex(
            user => parseInt(user.user_id) === parseInt(buynew[i].user_id)
          );
          trans.push({
            buyer: buynew[i].user_id,
            seller: action.user_id,
            price: buynew[i].price,
            quantity: buynew[i].quantity,
          });
          modusers[sellInd].quantity -= parseInt(buynew[i].quantity);
          modusers[sellInd].fiat +=
            parseInt(buynew[i].price) * parseInt(buynew[i].quantity);
          modusers[buyInd].quantity += parseInt(buynew[i].quantity);
          modusers[buyInd].fiat -=
            parseInt(buynew[i].price) * parseInt(buynew[i].quantity);
          console.log(modusers);
          quantity -= buynew[i].quantity;
          buynew[i].quantity = 0;
        } else {
          trans.push({
            buyer: buynew[i].user_id,
            seller: action.user_id,
            price: buynew[i].price,
            quantity: quantity,
          });
          var buyInd = modusers.findIndex(
            user => parseInt(user.user_id) === parseInt(buynew[i].user_id)
          );
          modusers[sellInd].quantity -= quantity;
          modusers[sellInd].fiat += buynew[i].price * quantity;
          modusers[buyInd].quantity += parseInt(quantity);
          modusers[buyInd].fiat -=
            parseInt(buynew[i].price) * parseInt(quantity);

          buynew[i].quantity -= quantity;
          quantity = 0;
          break;
        }
      }
      // console.log(trans, modusers, "trans moduser");
      // if (i < sellnew.length) sellnew[i].quantity -= quantity;

      return Object.assign({}, state, {
        buy: buynew,
        transaction: trans,
        users: modusers,
      });

    case MARKETBUY:
      var sellnew = state.sell.map(a => {
        return { ...a };
      });
      var modusers = state.users.map(a => {
        return { ...a };
      });
      var sellInd = modusers.findIndex(
        user => parseInt(user.user_id) === parseInt(action.user_id)
      );

      var quantity = action.quantity;

      var i = 0;
      var trans = state.transaction.map(a => {
        return { ...a };
      });

      for (i = 0; i < sellnew.length; i++) {
        // console.log(sellnew[i], quantity, "marketloop");
        if (sellnew[i].user_id === action.user_id) continue;
        if (quantity >= sellnew[i].quantity) {
          var buyInd = modusers.findIndex(
            user => parseInt(user.user_id) === parseInt(sellnew[i].user_id)
          );
          trans.push({
            buyer: sellnew[i].user_id,
            seller: action.user_id,
            price: sellnew[i].price,
            quantity: sellnew[i].quantity,
          });
          modusers[buyInd].quantity -= parseInt(sellnew[i].quantity);
          modusers[buyInd].fiat +=
            parseInt(sellnew[i].price) * parseInt(sellnew[i].quantity);
          modusers[sellInd].quantity += parseInt(sellnew[i].quantity);
          modusers[sellInd].fiat -=
            parseInt(sellnew[i].price) * parseInt(sellnew[i].quantity);
          console.log(modusers);
          quantity -= sellnew[i].quantity;
          sellnew[i].quantity = 0;
        } else {
          trans.push({
            buyer: sellnew[i].user_id,
            seller: action.user_id,
            price: sellnew[i].price,
            quantity: quantity,
          });
          var sellInd = modusers.findIndex(
            user => parseInt(user.user_id) === parseInt(sellnew[i].user_id)
          );
          modusers[buyInd].quantity -= quantity;
          modusers[buyInd].fiat += sellnew[i].price * quantity;
          modusers[sellInd].quantity += parseInt(quantity);
          modusers[sellInd].fiat -=
            parseInt(sellnew[i].price) * parseInt(quantity);

          sellnew[i].quantity -= quantity;
          quantity = 0;
          break;
        }
      }
      // console.log(trans, modusers, "trans moduser");
      // if (i < sellnew.length) sellnew[i].quantity -= quantity;

      return Object.assign({}, state, {
        sell: sellnew,
        transaction: trans,
        users: modusers,
      });

    case LIMITBUY:
      // return {
      //   buy: [
      //     ...state.buy,
      //     {
      //       quantity: action.quantity,
      //       price: action.price,
      //       user_id: action.user_id,
      //     },
      //   ],
      //   //update buy list with price,quantity,
      // };
      return Object.assign({}, state, {
        buy: [
          ...state.buy,
          {
            quantity: action.quantity,
            price: action.price,
            user_id: action.user_id,
          },
        ],
      });
    case LIMITSELL:
      // return {
      //   //update sell list
      //   sell: [
      //     ...state.sell,
      //     {
      //       quantity: action.quantity,
      //       price: action.price,
      //       user_id: action.user_id,
      //     },
      //   ],
      // };
      return Object.assign({}, state, {
        sell: [
          ...state.sell,
          {
            quantity: action.quantity,
            price: action.price,
            user_id: action.user_id,
          },
        ],
      });

    case CURRPRICE:
      return {
        curr_price: action.value,
      };
    case ADDUSER:
      return Object.assign({}, state, {
        users: [
          ...state.users,
          {
            name: action.name,
            quantity: action.quantity,
            fiat: action.fiat,
            user_id: action.user_id,
          },
        ],
      });
    // return {
    //   users: [
    //     ...state.users,
    //     {
    //       name: action.name,
    //       quantity: action.quantity,
    //       fiat: action.price,
    //     },
    //   ],
    // };
    case UPDATEUSER:
      const usersnew = state.users.forEach(el => {
        if (el.id == action.id) {
          el.name = action.name;
          el.quantity = action.quantity;
          el.fiat = action.fiat;
        }
      });
      return {
        users: usersnew,
      };
    default:
      return state;
  }
};

export default CountReducer;
