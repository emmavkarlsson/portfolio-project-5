// React imports
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// React Bootstrap imports
import {
  Button,
  Card,
  Col,
  Container,
  Media,
  Modal,
  Row,
} from "react-bootstrap";

// Styling imports
import styles from "../../styles/UserMessage.module.css";

// Other imports
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { AlertContext } from "../../context/AlertContext";
import Avatar from "../../components/Avatar";
import EditUserMessage from "./EditUserMessage";
import { MoreDropdown } from "../../components/MoreDropdown";

const UserMessage = (props) => {
  const {
    id,
    owner,
    receiver,
    created_at,
    content,
    profile_image,
    profile_id,
    setUserMessages,
    receiver_profile_image,
    receiver_username,
    receiver_profile_id,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser.username === owner;
  const is_receiver = currentUser.profile_id === receiver;
  const { setAlert } = useContext(AlertContext);

  const handleDelete = async () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosRes.delete(`/usermessages/${id}/`);
      setUserMessages((prevMessages) => ({
        ...prevMessages,
        results: prevMessages.results.filter((message) => message.id !== id),
      }));
      setAlert("Your message has been deleted!");
    } catch (err) {}
    setShowConfirmDelete(false);
  };

  return (
    <Container>
      <Row>
        {/* function to return sent messages */}
        {is_owner && (
          <Col className={styles.SentMessages}>
            <Media className="align-items-center">
              <Link to={`/profiles/${receiver_profile_id}`}>
                <Avatar src={receiver_profile_image} height={35} />
                {receiver_username}
              </Link>
              <span className={styles.Date}>{created_at}</span>
              {is_owner && !showEditForm && (
                <MoreDropdown
                  handleEdit={() => setShowEditForm(true)}
                  handleDelete={handleDelete}
                />
              )}
            </Media>
            <Card.Body>
              {showEditForm ? (
                <EditUserMessage
                  id={id}
                  profile_id={profile_id}
                  content={content}
                  setShowEditForm={setShowEditForm}
                  setUserMessages={setUserMessages}
                />
              ) : (
                <>{is_owner && content && <Card.Text>{content}</Card.Text>}</>
              )}
            </Card.Body>
          </Col>
        )}
        {/* function to return received messages */}
        {is_receiver && (
          <Col className={styles.ReceivedMessages}>
            <Media className="align-items-center">
              <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={35} />
                {owner}
              </Link>
              <span className={styles.Date}>{created_at}</span>
            </Media>
            <Card.Body>
              <>{is_receiver && content && <Card.Text>{content}</Card.Text>}</>
            </Card.Body>
          </Col>
        )}
      </Row>

      <Modal
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
      >
        <Modal.Body className="text-center">
          Are you sure you want to delete?
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDelete(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserMessage;
