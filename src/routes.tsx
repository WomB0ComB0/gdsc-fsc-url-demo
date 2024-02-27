import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Slug } from "./Slug";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`/`} element={<App />} />
      <Route path={`/:slug`} element={<Slug />} />
    </Routes>
  )
}

export function AppRouter(): JSX.Element {
  return (
    <Router>
      <main
        className={`
          flex flex-col items-center justify-center w-[100dvw] h-[100dvh]
        `}
      >
        <AppRoutes />
      </main>
    </Router>
  );
}

