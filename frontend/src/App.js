// React imports
import { Route, Switch } from "react-router-dom";

// Styling imports
import styles from "./App.module.css";

// Other imports
import "./api/axiosDefaults";
import { useCurrentUser } from "./context/CurrentUserContext";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import EditCoverImageForm from "./pages/profiles/EditCoverImageForm";
import ReportsCreateForm from "./pages/reports/ReportsCreateForm";
import ReportsList from "./pages/reports/ReportsList";
import ReportEditForm from "./pages/reports/ReportsEditForm";
import UserMessagesList from "./pages/usermessages/UserMessageList";
import NotFound from "./components/NotFound";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <PostsPage message="No results found. Adjust the search keyword." />
          )}
        />
        <Route
          exact
          path="/feed"
          render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
          )}
        />
        <Route
          exact
          path="/liked"
          render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
          )}
        />
        <Route
          exact
          path="/saved"
          render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or save a post."
                filter={`saved__owner__profile=${profile_id}&ordering=-saved_posts__created_at&`}
              />
          )}
        />
        <Route
          exact
          path="/usermessages/"
          render={() => (
            <Container className={styles.Main}>
              <UserMessagesList message="You don't have any messages." />
            </Container>
          )}
        />
        <Route
          exact
          path="/signin"
          render={() => (
            <Container className={styles.Main}>
              <SignInForm />
            </Container>
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => (
            <Container className={styles.Main}>
              <SignUpForm />
            </Container>
          )}
        />
        <Route
          exact
          path="/posts/create"
          render={() => (
            <Container className={styles.Main}>
              <PostCreateForm />
            </Container>
          )}
        />
        <Route
          exact
          path="/posts/:id"
          render={() => (
            <Container className={styles.Main}>
              <PostPage />
            </Container>
          )}
        />
        <Route
          exact
          path="/posts/:id/edit"
          render={() => (
            <Container className={styles.Main}>
              <PostEditForm />
            </Container>
          )}
        />
        <Route
          exact
          path="/profiles/:id"
          render={() => (
            <Container className={styles.Main}>
              <ProfilePage />
            </Container>
          )}
        />
        <Route
          exact
          path="/profiles/:id/edit/username"
          render={() => (
            <Container className={styles.Main}>
              <UsernameForm />
            </Container>
          )}
        />
        <Route
          exact
          path="/profiles/:id/edit/password"
          render={() => (
            <Container className={styles.Main}>
              <UserPasswordForm />
            </Container>
          )}
        />
        <Route
          exact
          path="/profiles/:id/edit"
          render={() => (
            <Container className={styles.Main}>
              <ProfileEditForm />
            </Container>
          )}
        />
        <Route
          exact
          path="/profiles/:id/edit_cover_image"
          render={() => (
            <Container className={styles.Main}>
              <EditCoverImageForm />
            </Container>
          )}
        />
        <Route
          path="/createreport/posts/:id"
          render={() => (
            <Container className={styles.Main}>
              <ReportsCreateForm />
            </Container>
          )}
        />
        <Route
          path="/reports/:id/edit"
          render={() => (
            <Container className={styles.Main}>
              <ReportEditForm />
            </Container>
          )}
        />
        <Route
          exact
          path="/reports/"
          render={() => (
            <Container className={styles.Main}>
              <ReportsList />
            </Container>
          )}
        />

        <Route
          render={() => (
            <Container className={styles.Main}>
              <NotFound />
            </Container>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
