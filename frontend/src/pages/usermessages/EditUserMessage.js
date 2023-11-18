import React, { useContext, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { AlertContext } from "../../context/AlertContext";

function EditUserMessage(props) {
    const { id, content, setShowEditForm, setUserMessages } = props;

    const [formContent, setFormContent] = useState(content);
    const { setAlert } = useContext(AlertContext);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Fetch the current state of the usermessage
            const response = await axiosRes.get(`/usermessages/${id}/`);
            const currentUsermessage = response.data;

            // Updates the usermessage
            await axiosRes.put(`/usermessages/${id}/`, {
                ...currentUsermessage,
                content: formContent.trim(),
            });

            // Updates the local state
            setUserMessages((prevUserMessages) => ({
                ...prevUserMessages,
                results: prevUserMessages.results.map((usermessage) => {
                    return usermessage.id === id
                        ? {
                            ...usermessage,
                            content: formContent.trim(),
                        }
                        : usermessage;
                }),
            }));
            setShowEditForm(false);
            setAlert("Your message has been updated!");
        } catch (err) { }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    name="content"
                    id="content"
                    value={formContent}
                    onChange={handleChange}
                    placeholder="Type your message..."
                />
            </Form.Group>
            <div className="d-flex justify-content-center">
                <Button
                    className={`${btnStyles.Button} ${btnStyles.DarkBeige}`}
                    type="button"
                    onClick={() => setShowEditForm(false)}>
                    Cancel
                </Button>
                <Button
                    className={`${btnStyles.Button} ${btnStyles.Brown}`}
                    type="submit">
                    Update message
                </Button>
            </div>
        </Form>
    );
}

export default EditUserMessage;