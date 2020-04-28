import React from "react";
import PropTypes from "prop-types";

import Field from "./Field";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  state = {
    fields: {
      username: "",
      password: "",
    },
    fieldErrors: {},
  };

  onFormSubmit = (evt) => {
    const user = this.state.fields;

    evt.preventDefault();

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
    if (!user.password) return true;
    if (errMessages.length) return true;

    return false;
  };

  render() {
    if (this.props.loginStatus === "SUCCEEDED") {
      return <Redirect to='/' />;
    }
    let status = this.props.loginStatus || "READY";

    return (
      <div>
        <h1>Login Sheet</h1>
        <label>{this.props.error || " "}</label>
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

export default Login;
