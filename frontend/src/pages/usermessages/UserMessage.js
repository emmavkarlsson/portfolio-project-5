import React, { useState } from 'react';
import styles from "../../styles/Post.module.css";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from '../../context/CurrentUserContext';
import EditUserMessage from './EditUserMessage';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { MoreDropdown } from '../../components/MoreDropdown';

const UserMessage = (props) => {
    const {
        owner,
        receiver,
        created_at,
        content,
        profile_image,
        profile_id,
        setUserMessages
    } = props;

    const { id } = useParams();
    const currentUser = useCurrentUser();
    const is_owner = currentUser.username === owner;
    const is_receiver = currentUser.profile_id === receiver;
    const [showEditForm, setShowEditForm] = useState(false);

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
                        setUserMessages={setUserMessages}
                        setShowEditForm={setShowEditForm}
                    />
                ) : (
                    <>{content && <Card.Text>{content}</Card.Text>}</>
                )}


            </Card.Body>
        </Card>
    );
};


export default UserMessage;