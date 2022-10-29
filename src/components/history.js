import React, { useState } from 'react'
import { UnmountClosed } from 'react-collapse';
import Button from 'react-bootstrap/Button';

  const History = () => {
    const state = {
      listitems: ['List Item 1','List Item 2', 'List Item 3', 'List Item 4', 'List Item 5',  'List Item 6'],
    };

    const [full, setfull] = useState(false);
    const [btncontent, setbtncontent] = useState("Expand all other transactions");

    const expand = () => {
      if(full){
        setfull(false);
        setbtncontent("Expand all other transactions")
      }else{
        setfull(true);
        setbtncontent("Close")
      }
    }
  return (
    <>
      <h2>Transaction History</h2>
      <ul className="list-group">
        {state.listitems.slice(-3).reverse().map(listitem => (
          <li key={listitem} className="list-group-item list-group-item-primary">
            {listitem}
          </li>
        ))}
      </ul>
      <UnmountClosed isOpened={full}>
        <ul className="list-group">
            {state.listitems.slice(0, -3).reverse().map(listitem => (
              <li key={listitem} className="list-group-item list-group-item-primary">
                {listitem}
              </li>
            ))}
        </ul>
      </UnmountClosed>
      <Button variant="primary" onClick={expand} style={{marginTop: 10}}>{btncontent}</Button>
    </>
    );
};

export default History;