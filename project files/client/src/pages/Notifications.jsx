import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/notifications.css";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if(user){

      setNotifications(user.notification || []);

    }

  }, []);

  return (

    <Layout>

      <div className="notifications-page">

        <h2>Notifications</h2>

        {notifications.length === 0 ? (

          <div className="notify-card">

            <h4>No Notifications</h4>

            <p>
              You don't have any notifications yet.
            </p>

          </div>

        ) : (

          notifications.map((item,index)=>(

            <div className="notify-card" key={index}>

              <h4>{item.title}</h4>

              <p>{item.message}</p>

            </div>

          ))

        )}

      </div>

    </Layout>

  );

}

export default Notifications;