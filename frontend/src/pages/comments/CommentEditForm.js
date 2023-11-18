// React imports
import React, { useContext, useState } from "react";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

// Styling imports
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// Other imports
import { axiosRes } from "../../api/axiosDefaults";
import { AlertContext } from "../../context/AlertContext";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
      setAlert("Your comment has been updated!");
    } catch (err) {}
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <Button
          className={`${btnStyles.Button} ${btnStyles.Beige}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Brown}`}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </Button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
