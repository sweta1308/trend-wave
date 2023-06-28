import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { makeServer } from "./server";

import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { PostProvider } from "./context/post-context";
import { UserProvider } from "./context/user-context";
import { BookmarkProvider } from "./context/bookmark-context";
import { ThemeProvider } from "./context/theme-context";
import { CommentProvider } from "./context/comment-context";
import ScrollToTop from "./components/ScrollToTop";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider>
        <AuthProvider>
          <PostProvider>
            <UserProvider>
              <BookmarkProvider>
                <CommentProvider>
                  <App />
                </CommentProvider>
              </BookmarkProvider>
            </UserProvider>
          </PostProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
