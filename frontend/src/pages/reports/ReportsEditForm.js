import React, { useEffect, useState, useContext } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/PostCreateEditForm.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { AlertContext } from "../../context/AlertContext";

function ReportEditForm() {
    const [errors, setErrors] = useState({});
    const { setAlert } = useContext(AlertContext);

    const [reportsData, setReportsData] = useState({
        subject: "",
        message: "",
        report_reason: "",
        post: "",
    });

    const { subject, message } = reportsData;

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/reports/${id}/`);
                const { subject, message, report_reason, is_owner, post } = data;

                is_owner ? setReportsData({ subject, message, report_reason, post }) : history.push("/");
            } catch (err) { }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setReportsData({
            ...reportsData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axiosReq.put(`/reports/${id}/`, reportsData);
            history.goBack();
            setAlert("Your report has been edited!");
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (

        <Form className="mt-2" onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Label>Why do you wish to report this image?</Form.Label>
                <select onChange={handleChange} name="report_reason" id="report_reason" value={reportsData.report_reason}>
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
                Update report
            </Button>
        </Form>
    );
}

export default ReportEditForm;