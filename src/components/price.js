// import React from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import {
//   marketbuy,
//   marketsell,
//   limitbuy,
//   limitsell,
//   updateuser,
//   addUser,
// } from "../store/actions/count.actions";
// import store from "../store";

// const Price = () => {
//   const dispatch = useDispatch();
//   const buy = useSelector(state => state.buy);
//   const sell = useSelector(state => state.sell);

//   return (
//     <Card style={{ width: "18rem" }}>
//       <Card.Header>Current Market Price</Card.Header>
//       <ListGroup variant="flush">
//         <ListGroup.Item>Cras justo odio</ListGroup.Item>
//         <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
//         <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
//       </ListGroup>
//       <Button variant="primary">Go somewhere</Button>
//     </Card>
//   );
// };

// export default Price;

// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";

// const Price = () => {
//   return (
//     <Row>
//       <h2>Current Market Price</h2>
//       <Row>
//         <Card>
//           <Card.Body>
//             <Card.Title>Current Buying Price</Card.Title>
//             <Card.Text>NA</Card.Text>
//           </Card.Body>
//         </Card>
//         <Card>
//           <Card.Body>
//             <Card.Title>Current Selling Price</Card.Title>
//             <Card.Text>NA</Card.Text>
//           </Card.Body>
//         </Card>
//       </Row>
//     </Row>
//   );
// };

// export default Price;

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
//separate buying and selling prices
const Price = () => {
  return (
    <Row>
      <h2>Current Market Price</h2>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>Current Buying Price</Card.Title>
            <Card.Text>NA</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Current Selling Price</Card.Title>
            <Card.Text>NA</Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Row>
  );
};

export default Price;
