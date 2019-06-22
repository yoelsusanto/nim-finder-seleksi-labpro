## ITB NIM Finder

### How to Run:

Runs the app in the development mode by typing `npm start`.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### How to Use:

1. Signup using new username and password
2. Login using new username and password
3. Type in your query, it could be student name or student id
4. Application will show the results below the search box

### Design:

- Application is made using various libraries including react, react-router and redux.
- Important states of the application is centralized into redux store to ease the process of state management.
- Various user action including clicking on login/logout button and typing search query will trigger the action creators to be dispatched. 
- Those action creators will the be processed by various reducers, each processing only the certain type of action.
- These mechanism causes the state of the application to change and the components would react to the state of the application. As such, the whole mechanism will create interaction with user.

### Libraries:

- [Lodash](https://github.com/lodash/lodash)
- [React](https://github.com/facebook/react)
- [React-Redux](https://github.com/reduxjs/react-redux
  )
- [React-Router](https://github.com/ReactTraining/react-router)
- [Redux](https://github.com/reduxjs/redux
  )
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk
  )
- [Axios](https://github.com/axios/axios)

### API Design Review:

The backend API return additional status for the http request in the json body and it uses non-standard status code. It would have been better for the API to return status code using standard http status code, therefore making error catching easier.

Author: Yoel Susanto - 13517014