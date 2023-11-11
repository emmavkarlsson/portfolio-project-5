import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Button } from "react-bootstrap";

function CreateMessageForm({ profile_id }) {
    const currentUser = useCurrentUser();
    // const history = useHistory();
    // const [errors, setErrors] = useState({});

    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    // useEffect(() => {
    //     setUsermessageData((prevState) => ({
    //         ...prevState,
    //         receiver: profile_id,
    //     })); console.log(currentUser)
    // }, [currentUser, profile_id]);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await axiosReq.post("/usermessages/", usermessageData);
    //         // history.push("/");
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosReq.post("/usermessages/", {
                content,
                receiver: profile_id,
            });
            setContent("");
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
            <Button variant="primary" type="submit">
                Send Message
            </Button>
        </Form>
    );
}

export default CreateMessageForm;