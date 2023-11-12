import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function ReportsCreateForm() {
    const currentUser = useCurrentUser();
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const location = useLocation();
    const post = location.state.post_id;

    const [reportsData, setReportsData] = useState({
        subject: "",
        message: "",
        report_reason: "spam",
        post: post,
    });

    const { subject, message, report_reason } = reportsData;

    const handleChange = (event) => {
        setReportsData({
            ...reportsData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        setReportsData((prevState) => ({
            ...prevState,
            owner: currentUser?.id,
            post: post,
        }));
    }, [currentUser, post]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        history.push("/");

        try {
            await axiosReq.post("/reports/", reportsData);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (

        <Form className="mt-2" onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Label>Why do you wish to report this image?</Form.Label>
                <select onChange={handleChange} name="report_reason" id="report_reason" value={report_reason}>
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
                    onChange={handleChange}
                    rows={1}
                />
            </Form.Group>
            {errors?.subject?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                    className={styles.Form}
                    type="text"
                    name="message"
                    as="textarea"
                    value={message}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            {errors?.subject?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Button
                className={`${styles.Button} btn d-block ml-auto`}
                disabled={!subject.trim()}
                type="submit"
            >
                Report
            </Button>
        </Form>
    );
}

export default ReportsCreateForm;