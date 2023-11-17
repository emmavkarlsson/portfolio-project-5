import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "../../styles/Reports.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Button, Col, Container, Row, Image } from "react-bootstrap";
import { AlertContext } from "../../context/AlertContext";

function ReportsCreateForm() {
    const currentUser = useCurrentUser();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const { setAlert } = useContext(AlertContext);

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

        try {
            await axiosReq.post("/reports/", reportsData);
            history.push("/");
            setAlert("Your report has been sent for review!");
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Row>
            <Col className="my-auto p-0 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h4>Why do you wish to report this image?</h4>
                    <Form className="mt-4" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Select a reason for reporting: </Form.Label>
                            <select onChange={handleChange} name="report_reason" id="report_reason" value={report_reason}>
                                <option value="spam">It's spam</option>
                                <option value="hate_speech">Hate speech or symbols</option>
                                <option value="false_information">False information</option>
                                <option value="bullying_or_harassment">Bullying or harassment</option>
                                <option value="other">Other reason</option>
                            </select>
                        </Form.Group>
                        {errors?.report_reason?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
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
                        {errors?.message?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="text-right">
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Beige} btn ml-auto`}
                                onClick={() => history.goBack()}
                                type="button"
                            >
                                cancel
                            </Button>
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Brown} btn ml-auto`}
                                type="submit"
                            >
                                report
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Col>
            <Col
                md={6}
                className="my-auto d-none d-md-block p-2"
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={"https://res.cloudinary.com/emmavkarlsson/image/upload/v1700218039/pexels-tara-winstead-8850750_sfh5b6.jpg"}
                />
            </Col>
        </Row>
    );
}

export default ReportsCreateForm;