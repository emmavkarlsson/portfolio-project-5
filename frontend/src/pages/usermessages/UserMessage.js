import React, { useState } from 'react';
import styles from "../../styles/Post.module.css";
import { Button, Card, Media, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from '../../context/CurrentUserContext';
import EditUserMessage from './EditUserMessage';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';

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
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser.username === owner;
    const is_receiver = currentUser.profile_id === receiver;
    const history = useHistory();

    const handleDelete = async () => {
        setShowConfirmDelete(true);
      };
    
      const confirmDelete = async () => {
        try {
          await axiosRes.delete(`/usermessages/${id}/`);
          history.go();
        } catch (err) {
          console.log(err);
        }
        setShowConfirmDelete(false);
      };
    

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{created_at}</span>
                        - <span>{is_owner ? "owner" : is_receiver ? "receiver" : ""}</span>
                    </div>
                    {is_owner && !showEditForm && (
                        <MoreDropdown
                            handleEdit={() => setShowEditForm(true)}
                            handleDelete={handleDelete}
                        />
                    )}
                </Media>
            </Card.Body>
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
                    <>{content && <Card.Text>{content}</Card.Text>}</>
                )}
            </Card.Body>

            <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
        <Modal.Body className="text-center">Are you sure you want to delete?
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDelete(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

        </Card>
    );
};


export default UserMessage;