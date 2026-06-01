import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import ProjectAfeka from "./pages/ProjectAfeka";
import ProjectCheckers from "./pages/Projectchecker";
import ProjectShift from "./pages/ProjectShift";
import ProjectClinic from "./pages/ProjectClinic";
import ProjectExam from "./pages/ProjectExam";
import ProjectGameFactory from "./pages/ProjectGameFactory";

import "./styles/global.css";

function ProjectPage({ Component }) {
  const navigate = useNavigate();

  return <Component onBack={() => navigate("/")} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/afeka-trails"
          element={<ProjectPage Component={ProjectAfeka} />}
        />

        <Route
          path="/checkers-game"
          element={<ProjectPage Component={ProjectCheckers} />}
        />

        <Route
          path="/shift-management"
          element={<ProjectPage Component={ProjectShift} />}
        />

        <Route
          path="/medical-clinic"
          element={<ProjectPage Component={ProjectClinic} />}
        />

        <Route
          path="/exam-system"
          element={<ProjectPage Component={ProjectExam} />}
        />

        <Route
          path="/game-factory"
          element={<ProjectPage Component={ProjectGameFactory} />}
        />
      </Routes>
    </BrowserRouter>
  );
}