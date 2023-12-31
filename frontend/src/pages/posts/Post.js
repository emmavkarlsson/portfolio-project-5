// React imports
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// React Bootstrap imports
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

// Styling imports
import styles from "../../styles/Post.module.css";

// Other imports
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { AlertContext } from "../../context/AlertContext";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
    save_post_id,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
      setAlert("Your post has been deleted!");
    } catch (err) {}
    setShowConfirmDelete(false);
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {}
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {}
  };

  // Let's users save posts

  const handleSavePost = async () => {
    try {
      const { data } = await axiosRes.post("/saved_posts/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id ? { ...post, save_post_id: data.id } : post;
        }),
      }));
    } catch (err) {}
  };

  // Let's users unsave posts

  const handleUnSavePost = async () => {
    try {
      await axiosRes.delete(`/saved_posts/${save_post_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id ? { ...post, save_post_id: null } : post;
        }),
      }));
    } catch (err) {}
  };

  // Let's users report an image

  const handleReportPost = () => {
    history.push({
      pathname: `/createreport/posts/${id}`,
      state: { post_id: id },
    });
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
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>

      {/* Let's users report posts */}

      <div className={styles.FlagContainer}>
        {!is_owner && currentUser ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Report this post</Tooltip>}
          >
            <span onClick={handleReportPost}>
              <i className={`fa-solid fa-flag ${styles.Flag}`} />
            </span>
          </OverlayTrigger>
        ) : !is_owner && !currentUser ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Log in to report a post!</Tooltip>}
          >
            <i className={`fa-solid fa-flag ${styles.Flag}`} />
          </OverlayTrigger>
        ) : null}
      </div>

      {/* Let's users like posts */}

      <Card.Body>
        <div className="row">
          <div className={`col-8 ${styles.LikeCommentPlacement}`}>
            <span className={styles.LikePost}>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              ) : like_id ? (
                <span onClick={handleUnlike}>
                  <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
              ) : currentUser ? (
                <span onClick={handleLike}>
                  <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to like posts!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              )}
              {likes_count}
            </span>
            {/* comment count  */}
            <span className={styles.CommentPost}>
              <Link to={`/posts/${id}`}>
                <i className="fa-regular fa-comment" />
              </Link>
              {comments_count}
            </span>
          </div>

          {/* Let's users save posts */}

          <div className={`col-4 ${styles.BookmarkPlacement}`}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't save your own post!</Tooltip>}
              >
                <i className="fa-regular fa-bookmark" />
              </OverlayTrigger>
            ) : save_post_id ? (
              <span onClick={handleUnSavePost}>
                <i className={`fa-solid fa-bookmark ${styles.Bookmark}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleSavePost}>
                <i
                  className={`fa-regular fa-bookmark ${styles.BookmarkOutline}`}
                />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to save posts!</Tooltip>}
              >
                <i className="fa-regular fa-bookmark" />
              </OverlayTrigger>
            )}
          </div>
        </div>

        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>

      {/* Modal to confirm deletion of post */}

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
    </Card>
  );
};

export default Post;
