import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../context/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { AlertContext } from "../../context/AlertContext";

const EditCoverImageForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const cover_imageFile = useRef();

    const [profileData, setProfileData] = useState({
        cover_image: "",
    });
    const { cover_image } = profileData;

    const [errors, setErrors] = useState({});
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { cover_image } = data;
                    setProfileData({ cover_image });
                } catch (err) {
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("cover_image", cover_image);

        if (cover_imageFile?.current?.files[0]) {
            formData.append("cover_image", cover_imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_cover_image: data.cover_image,
            }));
            history.goBack();
            setAlert("Your cover photo has been updated!");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Beige}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Brown}`} type="submit">
                save
            </Button>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                    <Container className={appStyles.Content}>
                        <Form.Group>
                            {cover_image && (
                                <figure>
                                    <Image src={cover_image} fluid />
                                </figure>
                            )}
                            {errors?.cover_image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.Beige} btn my-auto`}
                                    htmlFor="cover_image-upload"
                                >
                                    Change the Cover Image
                                </Form.Label>
                            </div>
                            <Form.File
                                id="cover_image-upload"
                                ref={cover_imageFile}
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setProfileData({
                                            ...profileData,
                                            cover_image: URL.createObjectURL(e.target.files[0]),
                                        });
                                    }
                                }}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
};

export default EditCoverImageForm;