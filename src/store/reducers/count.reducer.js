import {
  MARKETBUY,
  MARKETSELL,
  LIMITBUY,
  LIMITSELL,
  CURRPRICE,
  ADDUSER,
  UPDATEUSER,
  SELL,
  ORDER,
  ADDTRANS,
  SETPRICE,
} from "../actions/count.actions";
import PriorityQueue from "js-priority-queue";
function buycomp(a, b) {
  if (a.price == b.price) return b.order_id > a.order_id;
  else return a.price > b.price;
}
function sellcomp(a, b) {
  if (a.price == b.price) return b.order_id > a.order_id;
  else return a.price < b.price;
}
function queue(list, element, comp) {
  // creating object from queue element
  // var qElement = new QElement(element, priority);
  var contain = false;
  // console.log(element, "queue");
  // iterating through the entire
  // item array to add element at the
  // correct location of the Queue
  for (var i = 0; i < list.length; i++) {
    if (comp(list[i], element)) {
      // Once the correct location is found it is
      // enqueued
      list.splice(i, 0, element);
      contain = true;
      break;
    }
  }

  // if the element have the highest priority
  // it is added at the end of the queue
  if (!contain) {
    list.push(element);
  }
}
function dequeue(list, comp) {
  if (list.length == 0) return -1;
  else return list.pop();
}
function transact(
  list,
  trans,
  buyInd,
  sellInd,
  price,
  quantity,
  buyorder,
  sellorder
) {
  list[sellInd].quantity -= parseInt(quantity);
  list[sellInd].fiat += parseInt(price) * parseInt(quantity);
  list[buyInd].quantity += parseInt(quantity);
  list[buyInd].fiat -= parseInt(price) * parseInt(quantity);

  trans.push({
    buyer: list[buyInd].user_id,
    seller: list[sellInd].user_id,
    price: price,
    quantity: quantity,
    buyorder: buyorder,
    sellorder: sellorder,
  });
  console.log("transaction occuring", list, trans);
  return [list, trans];
}

const CountReducer = (
  state = {
    buy: [],
    sell: [],
    users: [],
    marketprice: [],
    transaction: [],
    orders: [],
  },
  action
) => {
  switch (action.type) {
    case MARKETSELL:
      //new market sell order
      var sellnew = state.sell.map(a => {
        return { ...a };
      });
      console.log("marketsell", sellnew);
      queue(
        sellnew,
        {
          order_id: action.order_id,
          quantity: action.quantity,
          user_id: action.user_id,
          price: Number(0),
          market: true,
        },
        sellcomp
      );

      return Object.assign({}, state, {
        sell: sellnew,
      });

    case MARKETBUY:
      //new market sell order
      var buynew = state.buy.map(a => {
        return { ...a };
      });
      queue(
        buynew,
        {
          order_id: action.order_id,
          quantity: action.quantity,
          user_id: action.user_id,
          price: Number(Infinity),
          market: true,
        },
        buycomp
      );
      return Object.assign({}, state, {
        buy: buynew,
      });

    case LIMITBUY:
      //limit buy order can lead to transactions when there is limit sell orders below it or market sell orders pending
      var buynew = state.buy.map(a => {
        return { ...a };
      });

      queue(
        buynew,
        {
          order_id: action.order_id,
          quantity: action.quantity,
          user_id: action.user_id,
          price: action.price,
          market: false,
        },
        buycomp
      );
      // console.log("limit order", buynew);
      return Object.assign({}, state, {
        buy: buynew,
      });

    case LIMITSELL:
      //limit sell order can lead to transactions when there is limit buy orders above it or any market buy orders pending
      var sellnew = state.sell.map(a => {
        return { ...a };
      });
      // console.log("marketsell", sellnew);
      queue(
        sellnew,
        {
          order_id: action.order_id,
          quantity: action.quantity,
          user_id: action.user_id,
          price: action.price,
          market: false,
        },
        sellcomp
      );

      return Object.assign({}, state, {
        sell: sellnew,
      });

    case ORDER:
      var sellnew = state.sell.map(a => {
        return { ...a };
      });
      var buynew = state.buy.map(a => {
        return { ...a };
      });
      // console.log(sellnew, buynew, "buy");
      var modusers = state.users.map(a => {
        return { ...a };
      });

      // var quantity = action.quantity;

      var trans = state.transaction.map(a => {
        return { ...a };
      });
      var mprice = state.marketprice.map(a => {
        return { ...a };
      });
      var i = 0;

      while (buynew.length > 0 && sellnew.length > 0) {
        // console.log(buynew, sellnew, "inside loop");
        // buynew=buynew.dequeue();

        // sellnew= sellnew.dequeue();
        var topbuy = buynew.pop();
        var topsell = sellnew.pop();
        var sellInd = modusers.findIndex(
          user => parseInt(user.user_id) === parseInt(topsell.user_id)
        );
        var buyInd = modusers.findIndex(
          user => parseInt(user.user_id) === parseInt(topbuy.user_id)
        );
        if (topbuy.price >= topsell.price) {
          var price = 0,
            qty;
          if (topbuy.market && !topsell.market) price = topsell.price;
          else if (!topbuy.market && topsell.market) price = topbuy.price;
          else if (!topbuy.market && !topsell.market)
            price =
              topbuy.order_id > topsell.order_id ? topbuy.price : topsell.price;
          else {
            console.log(
              "here",
              state.marketprice[state.marketprice.length - 1]
            );
            price = state.marketprice[state.marketprice.length - 1];
          }
          if (topbuy.quantity > topsell.quantity) {
            if (modusers[buyInd].fiat < price * topsell.quantity) {
              qty = parseInt(modusers[buyInd].fiat / topsell.quantity);
            } else qty = topsell.quantity;
            [modusers, trans] = transact(
              modusers,
              trans,
              buyInd,
              sellInd,
              price,
              qty,
              topbuy.order_id,
              topsell.order_id
            );
            topbuy.quantity -= qty;
            topsell.quantity = 0;
          } else {
            if (modusers[buyInd].fiat < price * topbuy.quantity) {
              qty = parseInt(modusers[buyInd].fiat / topbuy.quantity);
            } else qty = topbuy.quantity;
            [modusers, trans] = transact(
              modusers,
              trans,
              buyInd,
              sellInd,
              price,
              qty,
              topbuy.order_id,
              topsell.order_id
            );
            topsell.quantity -= qty;
            topbuy.quantity = 0;
            // console.log(modusers, trans, "in trans loop 2");
          }
          if (topbuy.quantity != 0) queue(buynew, topbuy, buycomp);
          if (topsell.quantity != 0) queue(sellnew, topsell, sellcomp);
          // console.log(trans, "in trans loop ");
        } else break;
      }
      // console.log(buynew, sellnew, modusers, trans, "buy and sell ");
      console.log(price, "in order");
      mprice.push({ curr_price: price, step: 0 });
      return Object.assign({}, state, {
        sell: sellnew,
        buy: buynew,
        users: modusers,
        transaction: trans,
        marketprice: mprice,
      });

    case SETPRICE:
      var nprice = [...state.marketprice];

      console.log(nprice, "nprice");
      nprice.push({
        curr_price: action.curr_price,
        step: action.step,
      });

      return Object.assign({}, state, {
        marketprice: nprice,
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
    case ADDTRANS:
      console.log("Addtras", action.buyer);
      return Object.assign({}, state, {
        transaction: [
          ...state.transaction,
          {
            buyer: action.buyer,
            seller: action.seller,
            price: action.price,
            quantity: action.quantity,
            buyorder: action.buyorder,
            sellorder: action.sellorder,
          },
        ],
      });

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
