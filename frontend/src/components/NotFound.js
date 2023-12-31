// React imports
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// React Bootstrap imports
import { Button } from "react-bootstrap";

// Styling imports
import styles from "../styles/NotFound.module.css";
import btnStyles from "../styles/Button.module.css";

const NotFound = () => {
  const history = useHistory();
  const handleButtonClick = () => {
    history.push("/");
  };

  return (
    <div className={styles.NotFound}>
      <h3 className={styles.Text}>
        Sorry, the page you are looking for does not exist.
      </h3>
      <Button
        onClick={handleButtonClick}
        className={`${styles.Button} ${btnStyles.Beige}`}
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
