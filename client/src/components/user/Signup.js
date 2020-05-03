import React from "react";
import PropTypes from "prop-types";

import Field from "components/app/Field";
import isEmail from "validator/lib/isEmail";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { attemptSignup } from "redux/actions";

class Signup extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  state = {
    fields: {
      username: "",
      email: "",
      password: "",
    },
    fieldErrors: {},
    attempted: false,
  };

  onFormSubmit = (evt) => {
    const user = this.state.fields;

    evt.preventDefault();
    this.setState({ attempted: true });

    if (this.validate()) return;

    this.props.onSubmit(user);
  };

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  };

  validate = () => {
    const user = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!user.username) return true;
    if (!user.email) return true;
    if (!user.password) return true;
    if (errMessages.length) return true;

    return false;
  };

  render() {
    if (this.props.loggedIn) return <Redirect to='/' />;
    if (this.props.signupStatus === "SUCCEEDED") {
      const redirectPath = this.props.location.state.from || "/login";
      return <Redirect to={redirectPath} />;
    }
    let status = this.state.attempted ? this.props.signupStatus : "READY";

    return (
      <div>
        <h1>Signup Sheet</h1>
        <label>{this.state.attempted ? this.props.error : ""}</label>
        <br />
        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Username'
            name='username'
            value={this.state.fields.username}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : "Username Required")}
          />

          <br />

          <Field
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (isEmail(val) ? false : "Invalid Email")}
          />

          <br />

          <Field
            placeholder='Password'
            name='password'
            value={this.state.fields.password}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : "Password Required")}
            isPassword={true}
          />

          <br />

          {
            {
              IN_PROGRESS: <input value='Logging...' type='submit' disabled />,
              FAILED: (
                <input
                  value='Login Failed - Retry?'
                  type='submit'
                  disabled={this.validate()}
                />
              ),
              READY: (
                <input
                  value='Submit'
                  type='submit'
                  disabled={this.validate()}
                />
              ),
            }[status]
          }
        </form>
      </div>
    );
  }
}

function mapStateToSignupProps(state) {
  return {
    signupStatus: state.signup.signupStatus,
    error: state.signup.error,
  };
}

function mapDispatchToSignupProps(dispatch) {
  return {
    onSubmit: (user) => dispatch(attemptSignup(user)),
  };
}

const ReduxSignup = connect(
  mapStateToSignupProps,
  mapDispatchToSignupProps
)(Signup);

export default ReduxSignup;
