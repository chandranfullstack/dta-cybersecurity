import { createBrowserRouter } from "react-router-dom";
import ConcereteCaseDetail from "src/pages/ConcreteCaseDetail/ConcereteCaseDetail";
import ConcreteCases from "src/pages/ConcreteCases/ConcreteCases";
import Quiz from "src/pages/quiz/Quiz";
import Dashboard from "src/pages/Dashboard/Dashboard";
import KnowledgeHub from "src/pages/KnowledgeHub/KnowledgeHub";
import PasswordGenerator from "src/pages/PasswordGenerator/PasswordGenerator";
import Home from "../pages/home/Home";
import SiginIn from "../pages/signin/Signin";
import Result from "src/pages/result/Result";
import Report from "src/pages/Reports/reports";
import PasswordSecurityChecker from "src/pages/PasswordSecurityChecker/PasswordSecurityChecker";
import {
  CONCRETE_CASES_DETAIL_ROUTE,
  CONCRETE_CASES_LIST_ROUTE,
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  KNOWLEDGEHUB_ROUTE,
  PASSWORD_GENERATOR_ROUTE,
  PASSWORD_SECURITY_CHECKER_ROUTE,
  QUESTION_ROUTE,
  RESULT_ROUTE,
  SIGNIN_ROUTE,
  WELCOME_ROUTE,
  REPORTS_ROUTE
} from "src/utils/constant";
import Welcome from "src/pages/welcome/Welcome";

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <Home />,
  },
  {
    path: SIGNIN_ROUTE,
    element: <SiginIn />,
  },
  {
    path: WELCOME_ROUTE,
    element: <Welcome />,
  },
  {
    path: QUESTION_ROUTE(),
    element: <Quiz />,
  },
  {
    path: RESULT_ROUTE(),
    element: <Result />,
  },
  {
    path: DASHBOARD_ROUTE,
    element: <Dashboard />,
  },
  {
    path: KNOWLEDGEHUB_ROUTE,
    element: <KnowledgeHub />,
  },
  {
    path: CONCRETE_CASES_LIST_ROUTE,
    element: <ConcreteCases />,
  },
  {
    path: CONCRETE_CASES_DETAIL_ROUTE(),
    element: <ConcereteCaseDetail />,
  },
  {
    path: PASSWORD_GENERATOR_ROUTE,
    element: <PasswordGenerator />,
  },
  {
    path: PASSWORD_SECURITY_CHECKER_ROUTE,
    element: <PasswordSecurityChecker />,
  },
  {
    path: REPORTS_ROUTE,
    element: <Report/>,
  },
]);

export default router;
