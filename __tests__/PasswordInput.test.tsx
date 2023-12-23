import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik, Form } from "formik";
import PasswordInput from "../src/components/PasswordInput";
import React from 'react'

const mockPassword = "testPassword";

describe("PasswordInput Component", () => {
  it("renders the component with default props", () => {
    render(
      <Formik initialValues={{ password: "" }} onSubmit={() => { }}>
        <Form>
          <PasswordInput />
        </Form>
      </Formik>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it("displays error message when touched and there is an error", async () => {
    render(
      <Formik
        initialValues={{ password: "" }}
        onSubmit={() => { }}
        initialErrors={{ password: "Required" }}
        initialTouched={{ password: true }}
      >
        <Form>
          <PasswordInput />
        </Form>
      </Formik>
    );

    const errorMessage = await screen.findByText(/required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the component with a custom name", () => {
    render(
      <Formik initialValues={{ customPassword: "" }} onSubmit={() => { }}>
        <Form>
          <PasswordInput name="customPassword" />
        </Form>
      </Formik>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("id", "customPassword");
  });

  it("does not show error message when not touched", () => {
    render(
      <Formik
        initialValues={{ password: "" }}
        onSubmit={() => { }}
        initialErrors={{ password: "Required" }}
      >
        <Form>
          <PasswordInput />
        </Form>
      </Formik>
    );

    const errorMessage = screen.queryByText(/required/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

});
