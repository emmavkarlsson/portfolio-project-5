import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReportsCreateForm() {
    const currentUser = useCurrentUser();

    const [reportsData, setReportsData] = useState({
        subject: "",
        message: "",
        report_reason: "spam",
    });

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
        <Form></Form>
    );
}

export default ReportsCreateForm;