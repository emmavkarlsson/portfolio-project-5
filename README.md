# Portfolio Project 5 (Code Institute) - Advanced Front End
## Introduction
PhotoStream is a dynamic photosharing website that let's users share images with each other, follow other accounts, commenting on posts and liking and saving posts. Beyond photo sharing, it also allows users to communicate through messaging, and also to uphold community standards by reporting inappropriate content. 

Deployed project: [Link](https://evk-pp5-cf55770a5b07.herokuapp.com/).

## Design
### Colors
I have chosen 3 main colors for my page, these are:
#0b0b0b, a dark, almost black color
#efede6, a light beige color
#7b6557, a brown color
#ffffff
These colors are used for most of the buttons, the text as well as the Navbar. 

### Font
I have used Montserrat in my project, which is a popular sans-serif font among designers, and is available on Google Fonts.

## Features
### Navbar
The navbar is visible for all users visiting the page, but what is displayed are different based on if you are logged in or not.
#### Visible for all users
Brand logo
Home icon / link
#### Visible for logged out users only
Sign in icon / link
Sign up icon / link
#### Visible for logged in users only
Add post icon / link
Feed icon / link
Messages icon / link
Sign out icon / link
User Avatar / link
Username / link

### HomePage
The homepage displays all shared posts in chronological order showing the latest post first. They are displayed with an infinite scroll, meaning that after 10 posts, the page loads another 10 posts. This is for both logged in and not logged in users, however it's displayed a little differently based on the current log in status. The HomePage also provides a search bar for users to search different keywords that will filter on post and profile.

#### *Visible for all users*
Shared posts in chronological order, latest post first, with infinite scroll. The user can see who has posted the image and the image title. The image links to the post, and the avatar/username links to the profile. 
The search bar is visible for all users.

#### *Visible for not logged in users*
Users who are not logged in, are greeted with the text "Welcome to PhotoStream", and below it, the shared posts displayed horizontally. The user can scroll through the posts horizontally and infinitely. 

#### *Visible for logged in users*
Users who are logged in can see the posts displayed horizontally and can scroll through them infinitely. Compared to logged out visitors, logged in users can see the description of the post, a heart icon with a likes count that let's them like the post and see how many likes the post have, a comment icon that links to the post page, and a saved button that let's them save the post. They can also see when each post was posted, a report icon that let's them report the post, as well as a container of the most popular profiles, displayed on the right hand side of the posts (on desktop, on mobile it is displayed above the posts). 

### Sign up Page
The sign up page is accessed through the navbar when visitors are not logged in, or through a link on the Sign In page. By clicking sign up in the navbar, the user is taken to the sign up page where they can create an account. 
The page consists of two columns, where one is the Sign Up form and the other is an image relevant to the website. The image is only visible on desktop view. The sign up form has a field for username, a password field as well as a confirm password field. If a user has accidentally ended up on the Sign Up page, when they were supposed to Sign In, there's a link under the sign up button that sends the user to the Sign In page instead. When a user has provided accepted credentials for an account and clicked the Sign Up button, they are sent to the sign in page.

### Sign In Page
The Sign In page is accessed through the navbar when visitors are not logged in, or through a link on the Sign Up page. By clicking sign in in the navbar, the user is taken to the sign in page where they can log in.
The page consists of two columns, where one is the Sign In form and the other is an image relevant to the website. The image is only visible on desktop view. The Sign In form has a field for username and a field for password. If a user has accidentally ended up on the Sign In page, when they were supposed to Sign Up, there's a link under the Sign In button that sends the user to the Sign Up page instead. When a user has provided a valid username and password, they are sent to the homepage for logged in users and the navbar updates. 

### Feed Page
The feed page looks exactly like the homepage, but with the difference that it only contains posts from profiles which the logged in user is following. Just like the homepage, it also has a Popular Profiles container. 

### Create Post Page	
The Create Post Page is accessed through an icon with text in the navbar, displayed on the left and side next to the brand logo. This page is only accessible for logged in users, and if visitors who are not logged in try to access the page, they get sent to the homepage. 
The Create Post Page contains of two columns, on the left hand side you can upload an image, and on the right hand side you can provide a title and a description of your image. The user can choose to cancel, and gets sent to the homepage. If a user submits a post, they will get sent to the post detail page for the post they uploaded.

### Liked Posts Page
Liked posts can be accessed through a link in the users profile page "Liked Posts". The Liked Posts Page looks and works like the Home Page, with the difference being that it's only showing the posts that the user has liked. If a user unlikes a post, it will be removed from the Liked Posts Page when the page is refreshed.

### Saved Posts Page
Saved Posts can be accessed through a link in the users profile page "Saved Posts". The Saved Posts Page looks and works like the Home Page, with the difference being that it's only showing the posts that the user has saved. If a user unsaves a post, it will be removed from the Saved Posts Page when the page is refreshed.

### Profile page
The profile page shows the users username, coverphoto (a default coverphoto if they haven't added one), the profile picture (a default profile picture if they haven't added one), their name (if they have provided it), bio (if they have provided it), as well as the number of posts, followers and following the user has. The Popular Profile container is displayed just like on the homepage, and all the posts the user has posted.

#### *Logged in, viewing someone else's profile*
If the user is logged in and is viewing someone else's profile, they can also see a follow/unfollow (based on current condition) button. When clicked, the user will unfollow/follow the person. Under the bio, there's a send message button, that let's the logged in user send a message to the user who's profile they are currently viewing. 

#### *Not logged in, viewing someone's profile*
If a visitor of the page is not logged in, it won't see the "follow" button, nor the "Send Message" in the profile information's section.

#### *Logged in, viewing their own profile*
If a user is viewing their own profile, neither the "send message" box nor the "follow/unfollow" button is visible. On the right hand side of the profile (or above, on mobile), two buttonlinks are visible: "My messages" and "My reports". Where the Send Message box is presented on other users profile, users can see buttonlinks for "liked posts" and "saved posts" instead. If a user is viewing it's own profile, three dots are visible next to the cover photo, which, when clicked, shows a dropdown menu. The dropdown menu contains "edit cover photo", "edit profile", "change username" and "change password", which will take them to the different pages. 

### Messages Page
The messages page contains the users sent and received messages, if they have any. They are displayed in two different containers, with Sent Messages on the left and Received Messages on the right. On mobile, Received Messages are placed above Sent Messages. The containers have a fixed height, and when it is filled with messages, the users can scroll through them vertically. 
Both the sent messages and received messages contain the other user's profile picture, username, the date of which the message was sent, as well as the message content. 
For each sent message, there's a three dots icon, which when clicked will let the user either update or delete the message. 

### Create Report Page
The Create Report page is accessed through the flag icon, displayed above the image in a post for users who are logged in. It is a simple page with a form and a picture. The form contains three fields. The first is Report reason, where the user get's to choose an option as to why they want to report the image. The other two fields are Subject and Message, where the user can explain why they are reporting the image. 
Under the form are two buttons, cancel and report. Cancel will send the user back to the page it came from without submitting the report, while the report page will submit the report.

### Reports List Page
The reports list page, or "My Reports" is accessed through a users own profile. The Reports List Page is a simple page where the user can see all the reports it has filed, with the subject and message details. It can see the current status of the report (either Awaiting Review, Reviewed or Closed). The user can also see an edit icon, as well as a trash can icon. The first will send the user to the Edit Report Page, while the second will let the user delete the report. 

### Edit Reports List Page
The Edit Reports List Page looks exactly like the Create Report Page, with the only difference being the header text, and the submit button being named "update report" compared to "report".

### Edit Profile Page
The Edit Profile Page looks like the Create Post Page, but instead of Title and Content, the user can set their name as well as a bio.

### Edit Cover Photo Page
The Edit Cover Photo Page looks like the Edit profile page, but with the difference that it only has one field the user can edit, which is the image. 

### Update Username Page
The update username page is a simple page with a one field form, where users can change their username.

### Update Password Page
The update password page is a simple page with a two field form, where users can set their new password in the first field, and confirm it in the second. 

## Components
Components are extremely handy to use, as every react component acts separately and you can import the component wherever you like. This means, you can change a part of your code in one place, and don't have to do the same update in multiple different files. This also means you can use the same component in each area of the app and change the individual pieces. Updates become more streamlined, reducing the overall update workload and enhancing efficiency. It also makes it a lot easier to fix errors, as you only have to fix it in one place. 

I have a couple different components that I have separated into their own files and then reused on other pages. These are:
* Navbar - the navbar is a component that is used on all pages across the platform.
* Avatar - the avatar is displayed on Posts, People's profiles, in Comments, Messages, the Popular Profiles as well as in the Navbar.
* MoreDropDown - the MoreDropDown component is used on Posts, in the Profile, on Sent Messages, Reports and Comments.
* Asset - the asset is a spinner which is used when something is loading. It is used on the Home Page, Posts Page and Profile Page when loading posts, Messages Page when loading messages and on the Reports Page when loading reports. 

Besides from these, I have multiple other components like Popular Profiles, which is imported to the Home Page as well as the Profile Page (when viewing someone else's profile).