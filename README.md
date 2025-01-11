# My Blog Space

Welcome to **My Blog Space**! This application allows users to **read, publish blogs**, and **create accounts**. The frontend is built with **React**, while the backend uses **Express using Hono library** and is deployed on **Cloudflare Workers**. The app supports full CRUD operations for blog posts and includes features like account creation, client-side routing, and more.

## Features

- **User Authentication**: Users can create an account and log in to publish and read blogs.
- **Create, Read, Update, Delete (CRUD)**: Users can publish, read, and manage their blog posts.
- **Client-Side Routing**: The application uses **React Router** for seamless navigation.
- **Suspense**: Suspense is used to handle loading states during data fetching.
- **Schema Validation**: Custom package for schema validation (both frontend and backend).
- **Database**: Uses **Prisma ORM** with **SQL database** for storing data.
- **Database Connection Pooling**: Prisma Accelerate is used to improve DB connection efficiency.
- **CORS Handling**: CORS is configured for frontend requests to the backend.

## Tech Stack

- **Frontend**:
  - React
  - React Hooks
  - Client-side routing with React Router
  - Suspense for data fetching
  - Axios for making HTTP request to hit the server
- **Backend**:
  - Express.js (using **Hono** library)
  - Prisma ORM for SQL database interaction
  - CORS for handling cross-origin requests
  - Cloudflare Worker environment for backend deployment
  - Schema validation with a custom package
  - **Database Connection Pooling**: Prisma Accelerate is used to improve database connection efficiency, ensuring optimal performance for database operations.

## Setup and Installation

### Prerequisites

- Node.js installed locally
- npm (Node Package Manager)

### Steps to Run the Application

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/harshk1729/My-Blog-Space.git
    cd my-blog-space
    ```

2. **Install Dependencies**:
    For both frontend and backend, run the following commands:

    - For the frontend:
        ```bash
        cd client
        npm install
        npm run dev
        ```


    The frontend will run on `http://localhost:5173/`. No need to run server locally, it is already deployed on cloudflare worker.

### How to Use

1. **Create an Account**: Register and create a new account with your username and password.
2. **Login**: Use your credentials to log in and start publishing blogs.
3. **Publish Blogs**: Once logged in, you can publish new blog posts and view your previously published content.
4. **Read blogs**: You can read blogs published by other users.

### Deployment

The application is deployed using Cloudflare Workers. The backend is managed in a serverless environment, which scales as needed.

- **Database Connection Pooling**: Prisma Accelerate is used to improve database connection efficiency, reducing the overhead of establishing new connections and enhancing scalability.

