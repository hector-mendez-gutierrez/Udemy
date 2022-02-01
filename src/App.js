import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ProjectsPage from "./components/proyectos/ProjectsPage";

import ProjectState from "./context/projects/projectState";
import TareaState from "./context/tasks/taskState";
import AlertsState from "./context/alerts/alertsState";
import AuthState from "./context/auth/authState";
import tokenAuth from "./config/tokenAuth";

import RutaPrivada from "./components/routes/RutaPrivada";

// Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  //console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProjectState>
      <TareaState>
        <AlertsState>
          <AuthState>
            <Router>
              {/*Todo lo q va aqui estara dispionible en todo el proyecto*/}
              <Switch>
                {/*Aqui van las diferentes paginas */}
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <RutaPrivada exact path="/projects" component={ProjectsPage} />
              </Switch>
            </Router>
          </AuthState>
        </AlertsState>
      </TareaState>
    </ProjectState>
  );
}

export default App;
