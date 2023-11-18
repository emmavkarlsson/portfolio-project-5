// React imports
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Styling imports
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";

// Other imports
import { axiosRes } from "../../api/axiosDefaults";
import { AlertContext } from "../../context/AlertContext";
import Avatar from "../../components/Avatar";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const { setAlert } = useContext(AlertContext);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {}
    setAlert("Your comment was created!");
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Brown} d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </Button>
    </Form>
  );
}

export default CommentCreateForm;
