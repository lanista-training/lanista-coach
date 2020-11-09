import React from 'react';
import {ThemeProvider } from 'styled-components';
import defaultTheme from './themes/default';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { isLogedIn, login, logout } from './lib/auth-web';

import LoginPanel from './screens/login';
import RegistrationPanel from './screens/registration';
import AnamnesePanel from './screens/anamnese';
import CreateFolderPanel from './screens/createfolder';
import CustomerPanel from './screens/customer';
import CustomersPanel from './screens/customers';
import DashboardPanel from './screens/dashboard';
import ExercisePanel from './screens/exercise';
import ExercisesPanel from './screens/exercises';
import FolderPanel from './screens/folder';
import ForgotPasswordPanel from './screens/forgotpassword';
import MeasuresPanel from './screens/measures';
import ProfilePanel from './screens/profile';
import SetupPanel from './screens/setup';
import TestPanel from './screens/test';
import TestsmanagerPanel from './screens/testsmanager';
import WorkoutPanel from './screens/workout';
import WorkoutsPanel from './screens/workouts';

const Anamnese = () => {
  let history = useHistory();
  let { memberId } = useParams();
  return <AnamnesePanel
    memberId={memberId}
    goBack={() => history.goBack()}
    goToSetup={() => history.push("/setup")}
  />
}

const CreateFolder = () => {
  let history = useHistory();
  let { exerciseId, planexerciseId } = useParams();
  return <CreateFolderPanel
    exerciseId={exerciseId}
    planexerciseId={planexerciseId}
    goBack={() => {
      history.goBack()
    }}
  />
}

const Customer  = () => {
  let history = useHistory();
  let { memberId } = useParams();
  return <CustomerPanel
    memberId={memberId}
    goBack={() => history.goBack()}
    goToAnamnese={(tab, objectId) => history.push('/anamnese/' + memberId)}
    goToExercise={(exerciseId, tab) => history.push('/exercise/' + exerciseId + '/'+  memberId + '/' + tab)}
    goToExercises={() => history.push('/exercises/' + memberId)}
    goToMeasures={() => history.push('/measures/' + memberId)}
    goToWorkout={(workoutId) => history.push('/workout/' + workoutId)}
    goToWorkouts={() => history.push('/workouts/' + memberId)}
    goToProfile={() => history.push('/profile/' + memberId)}
    goToSetup={() => history.push("/setup")}
  />

}

const Customers  = () => {
  let history = useHistory();
  let { workoutId } = useParams();
  return <CustomersPanel
    goBack={() => { history.goBack() }}
    goToCustomer={(customerId) => history.push('/customer/' + customerId)}
    workoutId={workoutId}
    goToSetup={() => history.push("/setup")}
  />
}

const Dashboard = () => {
  const history = useHistory();
  return <DashboardPanel
    goToCustomers={ () => history.push('/customers') }
    goToCustomer={ (memberId) => history.push('/customer/' + memberId) }
    goToExercises={ () => history.push('/exercises/') }
    goToWorkouts={ () => history.push("/workouts") }
    goToTests={ () => history.push("/testsmanager") }
    goBack={() => history.goBack()}
    goToSetup={() => history.push("/setup")}
  />
}

const Exercise = () => {
  let history = useHistory();
  let { exerciseId, memberId, tab, planexerciseId } = useParams();
  console.log("Exercise", exerciseId, memberId, tab, planexerciseId);
  return <ExercisePanel
    exerciseId={exerciseId}
    memberId={memberId}
    planexerciseId={planexerciseId}
    tab={tab}
    goBack={() => history.goBack()}
    goToExercise={() => history.push('/exercise/' + exerciseId + '/'+  memberId + '/' + tab + '/' + planexerciseId)}
    goToSetup={() => history.push("/setup")}
  />
}

const Exercises = () => {
  let history = useHistory();
  let { muscle, type, addition, exercises, memberId, workoutId, split, editmode, planexerciseId } = useParams();
  return <ExercisesPanel
    member={memberId}
    workout={workoutId}
    split={split}
    editmode={editmode}
    goToSetup={() => history.push("/setup")}
    goToExercise={(exerciseId, editmode) => {
      if( exerciseId && memberId && planexerciseId && editmode) {
        history.push('/exercise/' + exerciseId + '/' + memberId + '/' + planexerciseId + '/' + editmode);
      } else if( exerciseId && memberId && planexerciseId ) {
        history.push('/exercise/' + exerciseId + '/' + memberId + '/' + planexerciseId );
      } else if( exerciseId && memberId ) {
        history.push('/exercise/' + exerciseId + '/' + memberId );
      } else if( exerciseId ) {
        history.push('/exercise/' + exerciseId );
      }
    }}
    goBack={() => history.goBack() }
  />
}

const Folder = () => {
  let history = useHistory();
  let { exerciseId, planexerciseId } = useParams();
  return <FolderPanel
    exerciseId={exerciseId}
    planexerciseId={planexerciseId}
    goBack={() => history.goBack()}
  />
}

const ForgotPassword = () => {
  let history = useHistory();
  let { exerciseId, planexerciseId } = useParams();
  return <ForgotPasswordPanel
    exerciseId={exerciseId}
    planexerciseId={planexerciseId}
    goBack={() => history.goBack()}
  />
}

const Login = () => {
  let history = useHistory();
  return <LoginPanel
    goToRegistration={() => history.push("/registration")}
    goToRoot={() => history.push("/")}
    goToForgotPassword={() => history.push("/forgotpassword")}
  />
}


const Measures = () => {
  let history = useHistory();
  let { memberId } = useParams();
  return <MeasuresPanel
    memberId={memberId}
    goBack={() => history.goBack()}
    goToSetup={() => history.push("/setup")}
    goToTest={(testData) => {
      const {testtype, id} = testData;
      history.push("/test/" + memberId + '/' + testtype + '/' + id)
    }}
  />
}

const Profile = () => {
  let history = useHistory();
  let { memberId } = useParams();
  return <ProfilePanel
    memberId={memberId}
    goToSetup={() => history.push("/setup")}
    goBack={() =>  history.goBack()}
  />
}

const Registration = () => {
  let history = useHistory();
  return <RegistrationPanel
    goBack={() => history.push("/login")}
  />
}

const Setup = () => {
  let history = useHistory();
  const goBack = () => history.goBack()
  return <SetupPanel
    goBack={() =>  history.goBack()}
    doLogout={() => {
      logout();
    }}
  />
}

const Test = () => {
  let history = useHistory();
  let { memberId, testType, testId } = useParams();
  return <TestPanel
    memberId={memberId}
    testType={testType}
    testId={testId}
    goToSetup={() => history.push("/setup")}
    goBack={() => history.goBack()}
  />
}

const Testsmanager = () => {
  let history = useHistory();
  let { testId } = useParams();
  return <TestsmanagerPanel
    testId={testId}
    goBack={() => history.goBack()}
    goToTest={(testId) => history.push("/testsmanager/" + testId)}
    goToSetup={() => history.push("/setup")}
  />
}

const Workout = () => {
  let history = useHistory();
  let { workoutId } = useParams();
  return <WorkoutPanel
    workoutId={workoutId}
    goBack={() => history.goBack()}
    goToExercise={(exerciseId, memberId, planexerciseId) => {
      console.log("Workout", exerciseId, memberId, planexerciseId);
      const path = '/exercise/' + exerciseId + '/' + memberId + '/' + '0' + '/' + planexerciseId;
      console.log("PATH: ", path);
      history.push( path );
    }}
    goToExercises={(workoutId, split, editmode) => history.push('/exercises/' + workoutId + '/' + split + '/' + editmode)}
    goToCustomers={() => history.push('/customers/' + workoutId)}
    goToRoot={() => history.push('/')}
    goToWorkouts={() => history.push('/workouts')}
    goToSetup={() => history.push("/setup")}
  />
}

const Workouts = () => {
  let history = useHistory();
  let { memberId } = useParams();
  return <WorkoutsPanel
    goBack={() => history.goBack()}
    goToWorkout={(workoutId) => history.push('/workout/' + workoutId)}
    memberId={memberId}
    goToSetup={() => history.push("/setup")}
  />
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/anamnese/:memberId">
          <Anamnese />
        </Route>
        <Route path="/createfolder">
          <CreateFolder />
        </Route>
        <Route path="/customer/:memberId">
          <Customer />
        </Route>
        <Route path="/customers/:workoutId">
          <Customers />
        </Route>
        <Route path="/customers">
          <Customers />
        </Route>
        <PrivateRoute exact path="/">
          <Dashboard />
        </PrivateRoute>
        <Route path="/exercise/:exerciseId/:memberId/:tab/:planexerciseId">
          <Exercise />
        </Route>
        <Route path="/exercise/:exerciseId/:memberId/:tab">
          <Exercise />
        </Route>
        <Route path="/exercise/:exerciseId/:memberId">
          <Exercise />
        </Route>
        <Route path="/exercise/:exerciseId">
          <Exercise />
        </Route>
        <Route path="/exercises/:workoutId/:split/:editmode">
          <Exercises />
        </Route>
        <Route path="/exercises/:memberId">
          <Exercises />
        </Route>
        <Route path="/exercises/">
          <Exercises />
        </Route>
        <Route path="/folder/">
          <Folder />
        </Route>
        <Route path="/forgotpassword/">
          <ForgotPassword />
        </Route>
        <PrivateRoute path="/measures/:memberId">
          <Measures />
        </PrivateRoute>
        <Route path="/profile/:memberId">
          <Profile />
        </Route>
        <PrivateRoute path="/setup">
          <Setup />
        </PrivateRoute>
        <PrivateRoute path="/workout/:workoutId">
          <Workout />
        </PrivateRoute>
        <Route path="/workout">
          <Workout />
        </Route>
        <PrivateRoute path="/workouts/:memberId">
          <Workouts />
        </PrivateRoute>
        <PrivateRoute path="/workouts">
          <Workouts />
        </PrivateRoute>
        <PrivateRoute path="/test/:memberId/:testType/:testId">
          <Test />
        </PrivateRoute>
        <PrivateRoute path="/testsmanager/:testId">
          <Testsmanager />
        </PrivateRoute>
        <PrivateRoute path="/testsmanager">
          <Testsmanager />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  console.log("PrivateRoute")
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



export default App;
