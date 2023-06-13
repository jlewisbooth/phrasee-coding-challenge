import React from 'react';
import 'antd/dist/antd.css';
import LogInForm from './components/login-form';
import PatientList from './components/patients-list';
import { connect } from 'react-redux';

const App = (props) => {
  return (
    <>
      <header>
        <img src="./images/dhg_whole.png" />
      </header>
      <main>
        {!props.authenticated && <LogInForm />}
        {props.authenticated && <PatientList />}
      </main>
      <footer>
      </footer>
    </>
  );
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticatedUser,
  }
}

export default connect(mapStateToProps)(App);
