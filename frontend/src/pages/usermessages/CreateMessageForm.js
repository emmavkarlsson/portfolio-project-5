import React, { useContext, useState } from "react";
import btnStyles from "../../styles/Button.module.css";

import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { AlertContext } from "../../context/AlertContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function CreateMessageForm({ profile_id }) {

    const [userMessageData, setUserMessageData] = useState({
        content: "",
        receiver: profile_id,
    });
    const { content } = userMessageData;
    const history = useHistory();
    const { id } = useParams();
    const { setAlert } = useContext(AlertContext);

    const handleChange = (event) => {
        setUserMessageData({
            ...userMessageData,
            [event.target.name]: event.target.value,
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("content", content);
        try {
            await axiosReq.post("/usermessages/", userMessageData);
            setUserMessageData({ content: "", receiver: profile_id });
            history.push(`/profiles/${id}`);
            setAlert("Your message has been sent!");
        } catch (err) {}
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