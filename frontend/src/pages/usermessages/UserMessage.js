import React from 'react';
import styles from "../../styles/Post.module.css";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from '../../context/CurrentUserContext';

const UserMessage = (props) => {
    const {
        owner,
        receiver,
        created_at,
        content,
        profile_image,
        profile_id
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser.username === owner;
    const is_receiver = currentUser.profile_id === receiver;

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
                </Media>
            </Card.Body>
            <Card.Body>
                {content && <Card.Text>{content}</Card.Text>}
            </Card.Body>
        </Card>
    );
};


export default UserMessage;