# E-Learn

E-Learn is an online platform for students to browse and enroll in courses. The client is built with Next.js 14, and the server uses Node.js/Express with MongoDB.

## Features

- Student registration, login, and logout
- Browse available courses
- Enroll in courses
- Student and Admin dashboards

## Tech Stack

### Client

- [Next.js 14](https://nextjs.org/) (React Framework)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Shadcn UI](https://ui.shadcn.com/)

### Server

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/rajitha-srinath/modern-walk
    cd E-Learn
    ```

2. **Install client dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Install server dependencies:**
    ```bash
    cd server
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
PORT=8000
SECRET=your_jwt_secret
```

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default is 8000)
- `SECRET`: JWT secret key

### Running the Applications

#### Start the Server

From the `server` directory:

```bash
npm run dev
# or
yarn dev
```

Server runs on [http://localhost:8000](http://localhost:8000) by default.

#### Start the Client

From the root directory:

```bash
npm run dev
# or
yarn dev
```

Client runs on [http://localhost:3000](http://localhost:3000).

---

Now you can open [http://localhost:3000](http://localhost:3000) in your browser to use E-Learn.