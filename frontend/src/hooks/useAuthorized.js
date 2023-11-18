// React imports
import { useEffect } from "react";
import { useHistory } from "react-router";

// Other imports
import { useCurrentUser } from "../context/CurrentUserContext";

export const useAuthorized = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      history.push("/signin");
    }
  }, [history, currentUser]);
};
