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