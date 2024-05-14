"use client";

import { WhereHearOptions } from "@/enums/enums";
import React from "react";
import styles from "./register.form.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RegisterForm = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .matches(
        /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ']+ [a-zA-Zа-яА-ЯёЁіІїЇєЄ']+$/,
        "Must be two words like Jon Doe"
      )
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    birthDate: Yup.string()
      .required("Required")
      .test(
        "dateFormat",
        "Invalid date format",
        (value) => !isNaN(Date.parse(value))
      ),
    whereHear: Yup.string().required("Required"),
  });

  const onSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: any }
  ) => {
    try {
      const response = await fetch(`${API_URL}/participants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Invalid response");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <p>Register</p>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          birthDate: "",
          whereHear: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <label className={styles.label}>
              Full name:
              <Field className={styles.inputText} type="text" name="fullName" />
              <ErrorMessage
                name="fullName"
                component="div"
                className={styles.errorMessage}
              />
            </label>
            <label className={styles.label}>
              Email:
              <Field className={styles.inputText} type="text" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </label>
            <label className={styles.label}>
              Date of Birth(YYYY-MM-DD):
              <Field
                className={styles.inputText}
                type="text"
                name="birthDate"
              />
              <ErrorMessage
                name="birthDate"
                component="div"
                className={styles.errorMessage}
              />
            </label>
            <div>
              <p>Where did you hear about this event?</p>
              {Object.entries(WhereHearOptions).map(([key, value]) => (
                <label className={styles.labelRadio} key={key}>
                  <Field
                    className={styles.inputRadio}
                    type="radio"
                    name="whereHear"
                    value={key}
                  />
                  {value}
                </label>
              ))}
            </div>
            <ErrorMessage
              name="whereHear"
              component="div"
              className={styles.errorMessage}
            />
            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterForm;
