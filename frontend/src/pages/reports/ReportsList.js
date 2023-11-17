import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";

import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../../styles/PostCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { AlertContext } from "../../context/AlertContext";

function ReportsList() {
    const [reportsData, setReportsData] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const history = useHistory();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const { setAlert } = useContext(AlertContext);

    const REPORT_STATUS = {
        "awaiting_review": "Awaiting Review",
        "reviewed": "Reviewed",
        "closed": "Closed",
    };

    useEffect(() => {
        setHasLoaded(false);
        axiosReq.get("/reports/").then((response) => {
            if (Array.isArray(response.data.results)) {
                setReportsData(response.data.results);
            } else {
                setReportsData([]);
            }
            setHasLoaded(true);
        });
    }, [isDeleted]);

    useEffect(() => {
        setIsDeleted(false);
    }, [reportsData]);

    const handleEdit = (id) => {
        history.push(`/reports/${id}/edit`);
    };

    const handleDelete = async (id) => {
        setShowConfirmDelete(true);
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        try {
            await axiosRes.delete(`/reports/${deleteId}/`);
            setIsDeleted(true);
            history.push('/reports');
            setAlert("Your report has been deleted!");
        } catch (err) { }
        setShowConfirmDelete(false);
    };

    return (
        <Container>
            {hasLoaded ? (
                reportsData.length ? (
                    <div>
                        <Row className="mt-3 mb-3">
                            <Col>
                                <h3>My reports</h3>
                            </Col>
                        </Row>
                        <Row className="mt-3 mb-3">
                            <Col>
                                <h5>Subject</h5>
                            </Col>
                            <Col>
                                <h5>Message</h5>
                            </Col>
                            <Col>
                                <h5>Status</h5>
                            </Col>
                            {reportsData.some((reports) => reports.is_owner) && (
                                <Col>
                                    <h5>
                                        Edit
                                    </h5>
                                </Col>
                            )}
                            {reportsData.some((reports) => reports.is_owner) && (
                                <Col>
                                    <h5>
                                        Delete
                                    </h5>
                                </Col>
                            )}
                        </Row>
                        {reportsData.map((reports) => (
                            <Row key={reports.id}>
                                <Col className="mt-2">{reports.subject}</Col>
                                <Col className="mt-2">{reports.message}</Col>
                                <Col className="mt-2">{REPORT_STATUS[reports.report_status]}</Col>
                                {reports.is_owner && (
                                    <Col>
                                        <Button className={btnStyles.EditDelete}
                                            onClick={() => handleEdit(reports.id)}
                                        >
                                            <i className="fas fa-edit" />
                                        </Button>
                                    </Col>
                                )}
                                {reports.is_owner && (
                                    <Col>
                                        <Button className={btnStyles.EditDelete}
                                            onClick={() => handleDelete(reports.id)}
                                        >
                                            <i className="fas fa-trash-alt" />
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        ))}
                        <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
                            <Modal.Body className="text-center">Are you sure you want to delete the report?
                            </Modal.Body>
                            <Modal.Footer className="justify-content-center">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowConfirmDelete(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ) : (
                    <p>You haven't reported any pictures.</p>
                )
            ) : (
                <Container className="text-center justify-content-center">
                    <Asset spinner />
                    <p>Loading...</p>
                </Container>
            )}
        </Container>
    );
}

export default ReportsList;
