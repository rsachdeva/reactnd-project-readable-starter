## Functionality

This web app is designed to allow to New/Edit/Delete/Vote(UpVote/DownVote) for Posts and Comments associated with the Post
in Specific Categories. The Categories/Posts/Comments work with the Developed existing Server Side using Async Calls.

Posts and Comments are Sorted by Votes by default.
For Posts it includes Drop Down Option - Sorting by Votes and Created At for Posts.

The Main Posts Page reflects the Posts in all Categories and Filters by Category when Specific Category Heading is clicked.
It has Create Post button for new post besides Edit and Delete Icons in the List of Posts.
It has Voting buttons too.

The Show Post Page shows Post Body and Associated Comments.
It has Add Comment button to allow for new comment besides Edit and Delete Icons in the List of Comments.
It has Voting buttons too.

## Installation

Use npm or yarn.

npm install
yarn start

## Front End Additions

```
+-- src/
 |-- containers/ - This directory contains React Container Style components that do the data fetching and dispatch/state props
 set up for presentation/controlled form components. Each Screen has its own Container component - clearly stated by its name.
 So, for example ShowPostContainer is used for Show Post Screen for post/comment details.
 |-- presenters/ - This directory contains React Presentation Components to display/act on data at the UI level based on props
 received from container components. So, for example ShowPost presentation display screen works from props from ShowPostContainer.
 This also has AppRoutes based on React Router for Routing controls for each screen.
 |-- controlledForms/ - The directory is basically like presnters; only that they have form. Here we use local state for input text -
 react Controller style components. So, for example EditComment React works with EditUpdateCommentsContainer props. 
 |-- reducers/ - Per redux design, updates Redux state.
 |-- actions/ - Per redux design, these actions are dispatched. These use async actions.
 |-- utils/ - Here the interesting file is api that integrates calls to server from async actions.
```

Uses ES6/ES7 JS Style of code.
This uses Redux Store to save state for All Actions in General. 

## Copyright
Please notify if you are directly using code from here. Thanks.
Copyright © 2009-2017, Rohit Sachdeva