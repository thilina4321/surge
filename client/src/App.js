import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import { routes } from "./routes";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes> 
          {routes.map((rou, ind) => (
            <Route key={ind} path={rou.path} element={rou.element} />
          ))}

          <Route path="*" element={<Navigate to={"/unknown"} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
