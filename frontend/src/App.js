import styles from './App.module.css';
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import PostEditForm from './pages/posts/PostEditForm';
import { useCurrentUser } from './context/CurrentUserContext';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import EditCoverImageForm from './pages/profiles/EditCoverImageForm';
import ReportsCreateForm from './pages/reports/ReportsCreateForm';
import ReportsList from './pages/reports/ReportsList';
import ReportEditForm from './pages/reports/ReportsEditForm';
import UserMessagesList from './pages/usermessages/UserMessageList';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";


  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
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
              <PostsPage message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/saved"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword or save a post."
                filter={`saved__owner__profile=${profile_id}&ordering=-saved_posts__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route exact path="/profiles/:id/edit_cover_image" render={() => <EditCoverImageForm />} />
          <Route exact path="/usermessages/" render={() => <UserMessagesList />} />
          <Route path="/createreport/posts/:id" render={() => <ReportsCreateForm />} />
          <Route path="/reports/:id/edit" render={() => <ReportEditForm />} />
          <Route exact path="/reports/" render={() => <ReportsList />} />

          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;