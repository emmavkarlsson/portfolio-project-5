import React, { useContext, useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { AlertContext } from "../../context/AlertContext";

function EditUserMessage() {
    const [errors, setErrors] = useState({});
    const { setAlert } = useContext(AlertContext);

    const [userMessageData, setUserMessageData] = useState({
        content: "",
    });
    const { content } = postData;
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(userMessageData);
                const { title, content, image, is_owner } = data;

                is_owner ? setUserMessageData({ content }) : history.push("/");
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setUserMessageData({
            ...userMessageData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("content", content);

        try {
            await axiosReq.put(userMessage, formData);
            history.goBack();
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
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
                    Update message
                </Button>
            </div>
        </Form>
    );
}

export default EditUserMessage;