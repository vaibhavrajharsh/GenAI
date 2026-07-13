import { Route, Routes } from "react-router";
import Login from "./Features/Auth/pages/Login";
import Register from "./Features/Auth/pages/Register";
import Protected from "./Features/Auth/components/Protected";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <h1 className="text-4xl text-white">Home Page</h1>
          </Protected>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/second" element={<h1>second Page</h1>} />
    </Routes>
  );
};

export default App;
