/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function ProductComponent({pr}) {
    const [time, setTime] = useState(pr.time);

    useEffect(() => {
        pr.updateTime = (newTime) => {
            setTime(newTime);
        }
        pr.startExpiryTimer();
    
        // Clean up timer on component unmount
        return () => {
          clearInterval(pr.timer);
        };
      }, [pr]);

      return (
        <div>
          Title: {pr.title}, Price: {pr.price}
          <p>Time remaining: {time} seconds</p>
        </div>
      );

}

export default ProductComponent;