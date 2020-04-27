import PropTypes from "prop-types";
import React from "react";

import Field from "./Field";
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    shouldRedirect: PropTypes.bool,
  };

  state = {
    fields: this.props.fields || {
      name: "",
    },
    fieldErrors: {},
  };

  componentWillReceiveProps(update) {
    console.log("this.props.fields", this.props.fields, update);

    this.setState({ fields: update.fields });
  }

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
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.name) return true;
    if (errMessages.length) return true;

    return false;
  };

  render() {
    if (this.props.shouldRedirect) return <Redirect to={"/login"} />;
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : "Name Required")}
          />

          <input value='Submit' type='submit' disabled={this.validate()} />
        </form>
      </div>
    );
  }
}

export default SignUp;
