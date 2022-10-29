import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
    const notify = () => toast("Wow so easy!");

    return (
      <div>
        <FaBell onClick={notify}/>
        <ToastContainer />
      </div>
    );
  }

export default Notifications;