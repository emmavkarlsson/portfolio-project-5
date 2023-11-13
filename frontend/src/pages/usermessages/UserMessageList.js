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


    const [usermessages, setUsermessages] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchUsermessages = async () => {
            try {
                const { data } = await axiosReq.get(`/usermessages/`);
                setUsermessages(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchUsermessages();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);


    return (
        <div>
            {hasLoaded ? (
                <>
                    {usermessages.results.length ? (
                        <InfiniteScroll
                            children={usermessages.results.map((message) => (
                                <UserMessage key={message.id} {...message} />
                            ))}
                            dataLength={usermessages.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!usermessages.next}
                            next={() => fetchMoreData(usermessages, setUsermessages)}
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