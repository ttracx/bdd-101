import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import posed from "react-pose"

export class SignupForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ submitting, errors }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <button type="submit" disabled={submitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>

    );
  }
}

class App extends React.Component {
  state = {
    submitted: false,
    confirmation: "Thank you for your submission"
  };
  render() {
    return (
      <Container
        css={{
          color: "hotpink",
          height: "100vh",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          flex: 1,
          alignItems: "center"
        }}
      >
        <SignupForm
          css={{
            alignSelf: "center",
            justifyItem: "center"
          }}
          submitting={this.state.submitting}
          submit={() => {
            this.setState({ submitting: true });
          }}
        />

        <div id="output">
          {this.state.submitting ? this.state.confirmation : ""}
        </div>
      </Container>
    );
  }
}

export default App;
