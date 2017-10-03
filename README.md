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

cd ./reactnd-project-readable-starter/api-server
nodenv local 8.4.0 ( This step is optional; project tested with node version 8.4.0; nodenv is at https://github.com/nodenv/nodenv)
npm install
node server

cd ./reactnd-project-readable-starter/redux-client
nodenv local 8.4.0
npm install
npm start

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Front End Additions

Information about the React Redux based Front End Additions can be found in its [README file](redux-client/README.md).

## Copyright
Please notify if you are directly using code from here. Thanks.
Copyright © 2009-2017, Rohit Sachdeva