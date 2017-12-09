import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = field =>
  <div>
    <input className="form-control" {...field.input} />
    {field.touched &&
      field.error &&
      <div className="error">
        {field.error}
      </div>}
  </div>;

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

class Register extends React.Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span>
            <strong>Error!</strong> {this.props.errorMessage}
          </span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div>
          <div>
            <label>First Name</label>
            <Field name="firstName" component={renderField} type="text" />
          </div>
          <div>
            <label>Last Name</label>
            <Field name="lastName" component={renderField} type="text" />
          </div>
        </div>
        <div>
          <div>
            <label>Email</label>
            <Field name="email" component={renderField} type="email" />
          </div>
        </div>
        <div>
          <div>
            <label>Password</label>
            <Field name="password" component={renderField} type="password" />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { registerUser })(form(Register));
