// React imports
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// React bootstrap imports
import { Card, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

// Styling imports
import styles from "../../styles/UserMessage.module.css";
import appStyles from "../../App.module.css";

// Other imports
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import UserMessage from "./UserMessage";
import { useAuthorized } from "../../hooks/useAuthorized";

function UserMessagesList({ message }) {
  const [userMessages, setUserMessages] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useAuthorized();

  useEffect(() => {
    const fetchUserMessages = async () => {
      try {
        const { data } = await axiosReq.get(`/usermessages/`);
        setUserMessages(data);
        setHasLoaded(true);
      } catch (err) {}
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchUserMessages();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Row className="mt-3 mb-3 text-center">
        <Col>
          <h3>My messages</h3>
        </Col>
      </Row>
      {hasLoaded ? (
        <>
          {userMessages.results.length ? (
            <>
              <Container>
                <Row className={styles.flexRow}>
                  {/* displays the messages the user has sent */}
                  <Col lg={6} className="mt-2">
                    <Card>
                      <Card.Title
                        className={`text-center ${appStyles.Content}`}
                      >
                        SENT
                      </Card.Title>
                      <Card.Body>
                        <div className={styles.MessageContainer}>
                          <InfiniteScroll
                            children={userMessages.results
                              .filter((userMessage) => userMessage.is_owner)
                              .map((userMessage) => (
                                <UserMessage
                                  key={userMessage.id}
                                  {...userMessage}
                                  setUserMessages={setUserMessages}
                                />
                              ))}
                            dataLength={
                              userMessages.results.filter(
                                (userMessage) => userMessage.is_owner
                              ).length
                            }
                            loader={<Asset spinner />}
                            hasMore={!!userMessages.next}
                            next={() =>
                              fetchMoreData(userMessages, setUserMessages)
                            }
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* displays the messages the user has received */}
                  <Col lg={6} className="mt-2">
                    <Card>
                      <Card.Title
                        className={`text-center ${appStyles.Content}`}
                      >
                        RECEIVED
                      </Card.Title>
                      <Card.Body>
                        <div className={styles.MessageContainer}>
                          <InfiniteScroll
                            children={userMessages.results
                              .filter((userMessage) => !userMessage.is_owner)
                              .map((userMessage) => (
                                <UserMessage
                                  key={userMessage.id}
                                  {...userMessage}
                                  setUserMessages={setUserMessages}
                                />
                              ))}
                            dataLength={
                              userMessages.results.filter(
                                (userMessage) => !userMessage.is_owner
                              ).length
                            }
                            loader={<Asset spinner />}
                            hasMore={!!userMessages.next}
                            next={() =>
                              fetchMoreData(userMessages, setUserMessages)
                            }
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )}
        </>
      ) : (
        <Container className={appStyles.Content}>
          <Asset spinner />
        </Container>
      )}
    </div>
  );
}

export default UserMessagesList;
