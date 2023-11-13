import React, { useState, useContext } from "react";
import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";

import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";
import { Button } from "react-bootstrap";
import { AlertContext } from "../../context/AlertContext";

function CreateMessageForm({ profile_id }) {

    const [content, setContent] = useState("");
    const { setAlert } = useContext(AlertContext);

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosReq.post("/usermessages/", {
                content,
                receiver: profile_id,
            });
            setContent("");
            setAlert("Your message has been sent!");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    name="content"
                    id="content"
                    value={content}
                    onChange={handleChange}
                    placeholder="Type your message..."
                />
            </Form.Group>
            <div className="d-flex justify-content-center">
            <Button className={btnStyles.Beige} type="submit">
                Send Message
            </Button>
            </div>
        </Form>
    );
}

export default CreateMessageForm;