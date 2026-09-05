import { Route, Routes } from "react-router";
import Login from "./Features/Auth/pages/Login";
import Register from "./Features/Auth/pages/Register";
import Protected from "./Features/Auth/components/Protected";
import Home from "./Features/Interview/Home";
import ReportHistory from "./Features/Interview/pages/ReportHistory";
import ReportDetail from "./Features/Interview/pages/ReportDetail";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/reports"
        element={
          <Protected>
            <ReportHistory />
          </Protected>
        }
      />
      <Route
        path="/reports/:interviewId"
        element={
          <Protected>
            <ReportDetail />
          </Protected>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
