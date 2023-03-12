import { useState, useEffect } from "react";
//import {useHistory} from "react-router-dom";

function RedirectWithNotification() {
  const [showNotification, setShowNotification] = useState(false);
  //const history = useHistory();

  useEffect(() => {
    // Set the state to show the notification
    setShowNotification(true);

    // Redirect after 3 seconds
    const redirectTimeout = setTimeout(() => {
      history.push("/redirected-page");
    }, 3000);

    // Clear the timeout on component unmount to avoid memory leaks
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <div>
      {showNotification && <div>Redirecting to another page...</div>}
    </div>
  );
}