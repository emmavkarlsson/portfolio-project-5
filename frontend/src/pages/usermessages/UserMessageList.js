import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

import UserMessage from "./UserMessage";


function UserMessagesList({ message }) {

    const [userMessages, setUserMessages] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchUserMessages = async () => {
            try {
                const { data } = await axiosReq.get(`/usermessages/`);
                setUserMessages(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
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
            {hasLoaded ? (
                <>
                    {userMessages.results.length ? (
                        <InfiniteScroll
                            children={userMessages.results.map((userMessage) => (
                                <UserMessage key={userMessage.id} {...userMessage} setUserMessages={setUserMessages} />
                            ))}
                            dataLength={userMessages.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!userMessages.next}
                            next={() => fetchMoreData(userMessages, setUserMessages)}
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
        </div>
    );
}


export default UserMessagesList;