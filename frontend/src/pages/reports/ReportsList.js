// React imports
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Col, Row } from "react-bootstrap";

function ReportsList() {
    const [reportsData, setReportsData] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

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
    }, []);


    return (
        <Container>
            {hasLoaded ? (
                reportsData.length ? (
                    <div>
                        <Row>
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
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </h5>
                                </Col>
                            )}
                        </Row>
                        {reportsData.map((reports) => (
                            <Row key={reports.id}>
                                <Col>{reports.subject}</Col>
                                <Col>{reports.message}</Col>
                                <Col>{REPORT_STATUS[reports.report_status]}</Col>
                                {reports.is_owner && (
                                    <Col>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </Col>
                                )}
                            </Row>
                        ))}
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