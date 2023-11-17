import React from 'react';
import styles from "../../styles/Post.module.css";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";


const PostSmall = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        title,
        image,
    } = props;

    return (
        <Card className={styles.PostSmall}>
            <Card.Body className="p-1">
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={25} />
                        {owner}
                    </Link>
                </Media>
            </Card.Body>
            <Card.Body className={`p-0 ${styles.imageSquare}`}>
                <Link to={`/posts/${id}`}>
                    <Card.Img className="rounded-0" src={image} alt={title}
                    />
                </Link>
            </Card.Body>
            <Card.Body className="p-1">
                {title && <Card.Text className="text-center">{title}</Card.Text>}
            </Card.Body>
        </Card>
    );
};


export default PostSmall;
