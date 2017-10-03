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
