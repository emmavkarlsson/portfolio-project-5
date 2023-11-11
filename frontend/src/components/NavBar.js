import React, { useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import axios from "axios";
import logo from "../assets/ekp-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../context/CurrentUserContext";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const [showConfirmSignout, setShowConfirmSignout] = useState(false);

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignout = async () => {
    setShowConfirmSignout(true);
  };

  const confirmSignout = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      history.push("/");
      setCurrentUser(null);
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
      <NavDropdown
        title={<Avatar src={currentUser?.profile_image} text="Profile" height={40} />}
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item as={NavLink} to={`/profiles/${currentUser?.profile_id}`}>
          View Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to={`/profiles/${currentUser?.profile_id}/edit`}>
          Edit Profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleSignout}>Sign out</NavDropdown.Item>
      </NavDropdown>
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

  return (
    <>
      <Navbar
        expanded={expanded}
        className={styles.NavBar}
        expand="sm"
        fixed="top"
      >
        <Container>
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