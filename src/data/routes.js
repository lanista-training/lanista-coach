// Routes

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// We're using `react-router-dom` to handle routing, so grab the `RouteProps`
// type that we'll use to ensure our own types conform to the expected configuration
import { RouteProps } from "react-router-dom";

/* Local */

// Components

// By default, pull in the ReactQL example. In your own project, just nix
// the `src/components/example` folder and replace the following line with
// your own React components
import Example from "@/components/example";
import App from "@/screens/app";
import Dashboard from "@/screens/dashboard";
import Login from "@/screens/login";
import Registration from "@/screens/registration";
import Setup from "@/screens/setup";
import Customers from "@/screens/customers";
import Folder from "@/screens/folder";
import Customer from "@/screens/customer";

// ----------------------------------------------------------------------------

// Specify the routes. This is provided as an array of `RouteProp`, which is
// a type provided by `react-router-dom` for rendering a route. Typically, this
// will contain at least a component and a path
const routes = [
  {
    component: Dashboard, // <-- this is the component that'll be rendered
    exact: true, // <-- this says to ONLY match when the path is exactly '/'
    path: "/", // <-- ... and this is the actual path to match on
    private: true,
  },
  {
    component: Customers, // <-- this is the component that'll be rendered
    path: "/customers", // <-- ... and this is the actual path to match on
    private: true,
  },
  {
    component: Setup, // <-- this is the component that'll be rendered
    path: "/setup", // <-- ... and this is the actual path to match on
    private: true,
  },
  {
    component: Folder, // <-- this is the component that'll be rendered
    path: "/folder", // <-- ... and this is the actual path to match on
    private: true,
  },
  {
    component: Customer, // <-- this is the component that'll be rendered
    path: "/customer", // <-- ... and this is the actual path to match on
    private: true,
  },
  {
    component: Login, // <-- this is the component that'll be rendered
    path: "/login", // <-- ... and this is the actual path to match on
    private: false,
  },
  {
    component: Registration, // <-- this is the component that'll be rendered
    path: "/registration", // <-- ... and this is the actual path to match on
    private: false,
  },
];

export default routes;
