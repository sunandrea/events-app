"use client";

import { usePathname } from "next/navigation";

import { WhereHearOptions } from "@/enums/enums";
import React from "react";
import styles from "./register.form.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IFormData } from "@/interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RegisterForm = () => {
  const pathName = usePathname();

  const eventId = pathName.split("/")[2];

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
    values: IFormData,
    { setSubmitting, resetForm }: { setSubmitting: any; resetForm: any }
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
        const data = await response.json();
        window.alert(data.message);
        throw new Error(data.message || "Invalid response");
      }

      window.alert("Success");
      resetForm();
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
          event: eventId,
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
                    value={value}
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
