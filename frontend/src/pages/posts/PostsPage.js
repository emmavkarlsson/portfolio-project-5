// React imports
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// Styling imports
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";

// Other imports
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import Post from "./Post";
import PostSmall from "./PostSmall";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import PopularProfiles from "../profiles/PopularProfiles";

function PostsPage({ message, filter = "", secure = "false" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {}
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  const loggedInView = (
    <>
      <Container className={appStyles.Main}>
        <Row className="h-100">
          <Col>
            <PopularProfiles mobile />
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form
              className={styles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                id="logged-in-searchbar"
                type="text"
                className="mr-sm-2"
                placeholder="Search posts"
              />
            </Form>
            {hasLoaded ? (
              <>
                {posts.results.length ? (
                  <InfiniteScroll
                    children={posts.results.map((post) => (
                      <Post key={post.id} {...post} setPosts={setPosts} />
                    ))}
                    dataLength={posts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!posts.next}
                    next={() => fetchMoreData(posts, setPosts)}
                  />
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
          </Col>
          <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
            <PopularProfiles />
          </Col>
        </Row>
      </Container>
    </>
  );

  const loggedOutView = (
    <>
      <div className={appStyles.Main}>
        <div className={styles.heroImage}>
          <Container className={styles.displayFlex}>
            <Row className="h-50">
              <Col>
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                  className={styles.SearchBar}
                  onSubmit={(event) => event.preventDefault()}
                >
                  <Form.Control
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    id="logged-out-searchbar"
                    type="text"
                    className="mr-sm-2"
                    placeholder="Search posts"
                  />
                </Form>
              </Col>
            </Row>

            <Row className="h-100">
              <Col className="text-center">
                <h2 className={styles.HeroH2}>Welcome to</h2>
                <h1 className={styles.HeroH1}>PhotoStream</h1>
              </Col>
            </Row>

            <Row className={`h-100 ${styles.postsRow}`}>
              <Col>
                {hasLoaded ? (
                  <>
                    {posts.results.length ? (
                      <InfiniteScroll
                        className={styles.horizontalScroll}
                        children={posts.results.map((post) => (
                          <Container
                            className={styles.postContainer}
                            key={post.id}
                          >
                            <PostSmall {...post} setPosts={setPosts} />
                          </Container>
                        ))}
                        dataLength={posts.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!posts.next}
                        next={() => fetchMoreData(posts, setPosts)}
                      />
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
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );

  return <div>{!currentUser ? loggedOutView : loggedInView}</div>;
}

export default PostsPage;
