import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { makeServer } from "./server";

import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { PostProvider } from "./context/post-context";
import { UserProvider } from "./context/user-context";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
