import React, { useContext, useEffect, useState } from "react";
import { Container, Navbar, Nav, Modal, Button } from "react-bootstrap";
import axios from "axios";
import logo from "../assets/photostream-logo-simple.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../context/CurrentUserContext";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AlertContext } from "../context/AlertContext";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const [showConfirmSignout, setShowConfirmSignout] = useState(false);

  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const { alert, setAlert } = useContext(AlertContext);

  const handleSignout = async () => {
    setShowConfirmSignout(true);
  };

  const confirmSignout = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      history.push("/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    } setShowConfirmSignout(false)
  };

  const addPostIcon = (
    <NavLink
      to="/posts/create"
      className={styles.NavLink}
      activeClassName={styles.Active}
    >
      <i className="far fa-plus-square"></i>Add post
    </NavLink>
  )

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/usermessages"
      >
        <i className="fa-solid fa-message"></i>Messages
      </NavLink>
      <NavLink
        className={styles.NavLink}
        onClick={handleSignout}
        to="/"
      >
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
      to={`/profiles/${currentUser?.profile_id}`}
    >
      <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} />
    </NavLink>
    </>
  );


  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  useEffect(() => {
    if (alert && typeof alert === "string" && alert !== "null") {
      toast(alert);
      setAlert(null);
    }
  }, [alert, setAlert]);

  return (
    <>
      <Navbar
        expanded={expanded}
        className={styles.NavBar}
        expand="lg"
        fixed="top"
      >
        <Container>
          <ToastContainer position="top-center" />
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="45" />
            </Navbar.Brand>
          </NavLink>
          {currentUser && addPostIcon}
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink
                exact to="/"
                className={styles.NavLink}
                activeClassName={styles.Active}
              >
                <i className="fas fa-home"></i>Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal to confirm signout */}

      <Modal show={showConfirmSignout} onHide={() => setShowConfirmSignout(false)}>
        <Modal.Body className="text-center">Are you sure you want to signout?
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="secondary"
            onClick={() => setShowConfirmSignout(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmSignout}
          >
            Signout
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
};

export default NavBar;