import { useState } from "react";
import "../stylesheet/Alert.scss";

const Alert = props => {
  const [show, setShow] = useState(true);

  const onClose = () => {
    props.onClose();
    setShow(false);
  };

  return (
    <>
      {show && (
        <div class="alert">
          <span></span>
          <p>{props.message}</p>
          <span onClick={onClose}>&times;</span>
        </div>
      )}
    </>
  );
};

export default Alert;
