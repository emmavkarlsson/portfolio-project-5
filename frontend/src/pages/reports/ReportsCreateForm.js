import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";

function ReportsCreateForm() {
    const currentUser = useCurrentUser();
    const history = useHistory();

    const [reportsData, setReportsData] = useState({
        subject: "",
        message: "",
        report_reason: "spam",
    });

    const { subject, message } = reportsData;

    useEffect(() => {
        setReportsData((prevState) => ({
            ...prevState,
            owner: currentUser?.id,
        }));
    }, [currentUser]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axiosReq.post("/reports/", reportsData);
        } catch (err) {
            console.log(err);
        }
    };

    return (

        <Form className="mt-2" onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Label>Why do you wish to report this image?</Form.Label>
                <select name="report_reason" id="report_reason">
                    <option value="spam">It's spam</option>
                    <option value="hate_speech">Hate speech or symbols</option>
                    <option value="false_information">False information</option>
                    <option value="bullying_or_harassment">Bullying or harassment</option>
                    <option value="other">Other reason</option>
                </select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Subject</Form.Label>
                <Form.Control
                    className={styles.Form}
                    type="text"
                    name="subject"
                    as="textarea"
                    value={subject}
                    rows={1}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                    className={styles.Form}
                    type="text"
                    name="message"
                    as="textarea"
                    value={message}
                    rows={2}
                />
            </Form.Group>
            <Button
                className={`${styles.Button} btn d-block ml-auto`}
                disabled={!subject.trim()}
                type="submit"
            >
                send
            </Button>
        </Form>
    );
}

export default ReportsCreateForm;