# MERN-Blog

This project is a full-stack blog application built from scratch using the MERN (MongoDB, Express.js, React, Node.js) tech stack.

## Prerequisites

Before you begin, make sure you have the following knowledge:

1. **Frontend Basics:** Understanding of HTML, CSS, and JavaScript.
2. **React Router:** Familiarity with React Router DOM for handling navigation within your application.
3. **Tailwind CSS:** Basic knowledge of Tailwind CSS for applying utility-first styling to your components.
4. **APIs:** Understanding how to make API requests and handle responses.
5. **Backend Basics:** Basic knowledge of Node.js and Express.js for building server-side applications.
6. **MongoDB CRUD Operations:** Understanding of how to perform Create, Read, Update, and Delete (CRUD) operations in MongoDB.

## Project Setup

Follow the steps below to set up the project:

1. **Install Yarn:**
   ```bash
   npm install --global yarn
2. **Create react Project with Vite**
   ```bash 
   yarn create vite

## tailwindCSS setUp:-
 - to set up Tailwind CSS in your Project,follow this [step-by-step guide](https://dev.to/ashirbadgudu/set-up-tailwind-css-with-create-react-app-and-yarn-pio).

## FlowBite setup:-
 - Read this [step by step guide](https://flowbite-react.com/docs/getting-started/introduction)

### Step-by-Step Guide for Project Creation and Commit Management

1. **Pages**: In this blog app, three pages have been created:
   1. **Home** page
   2. **About Us** page
   3. **Project** page

2. **React Router**: Use React Router DOM to connect these pages together. To install React Router DOM, run the following command:

   ```bash
   yarn add react-router-dom

3. **create component folder**: in this folder. we will create our componets.To create components:-
### Components

1.**header**:- built header component using flowbite components

2.**create server**:- Create server using express in index.js file. to install express add 
```bash
yarn add express
```

3.**connect database**:- connect database with MongoDB using mongoose. 

## mongoose install:-
 ```bash
 yarn add mongoose
 ```

4.**user model**:- created the model using user schema in user.js file and export it.

5.**test api**:- create a test api and follow the MVC to structure the files.

6.**sign up option**:- create a user to sign up and the data will be add into the 
database and implemented some random error handling.

7.**postman**:- to check Api use postman software.

8.**sign up**:- design the sign up page using flowbite component and tailwindCSS.

9.**form handling**:- handling the form by adding functionality to sign up page.

10.**connect frontend with backend**:- connected sign up page with backend api so user can sign up and the data can be stored in mongoDB.

11.**Error handling**:- handle the errors and added loading effect so user can understand form is submitted and navigate to the sign in page.

12.**create sign in route**:- create sign in route using jwt and bcrypt add error handling different kind of errors.

13.**sign In page on frontend**:- add functionality in sign in page.

14.**add redux toolkit**:- all the error handling and loading effect store in the react redux toolkit.

## IMPORTANT:-

15.**Redux persistent**:- To persist the state of our application use redux-persist package.

 ### install persist packeage :- 
 ```bash
 yarn add redux-persist
 ```
16.**google auth**:- make project on firebase and use authentication using google firebase authentication.it will check if the user is already present then it will login otherwise it will create new schema and log in.

17.**add user profile**:- update the header component using google auth and profile of the user.added drop down menu 

18.**dark mode**:- applied dark mode fuctionality using redux store.

 
