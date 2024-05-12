import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import Home from "./routes/Home";
import { Navbar, Hero, Footer } from "./components";

import { UserProvider } from "./components/UserContext";
import { ComicsProvider } from "./components/ComicsProvider";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  // Define static routes
  const routes = [
    { path: "/", view: "home" },
    { path: "/inspect", view: "inspect" },
    { path: "/inspect/chapters", view: "chapter" },
    { path: "/bookmarks", view: "bookmarks" },
    { path: "/comics", view: "comics" },
    { path: "/management", view: "management" },
    { path: "/register", view: "register" },
    { path: "/login", view: "login" },
    { path: "/profile", view: "profile" },
  ];

  // Render routes only if data is loaded
  return (
    <Router>
      <ScrollToTop />
      <UserProvider>
        <ComicsProvider>
          <Routes>
            {/* Render static routes */}
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <section className="h-auto min-h-screen bg-secondary flex flex-col items-center">
                    <Navbar />
                    <Hero view={route.view} />
                    <Footer />
                  </section>
                }
              />
            ))}
          </Routes>
        </ComicsProvider>
      </UserProvider>
    </Router>
  );
}
