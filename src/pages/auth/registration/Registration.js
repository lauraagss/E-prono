import * as React from "react";
import {Formik} from "formik";
import {register} from "../../../services/auth-service";
import { toast } from 'react-toastify';
import {Link, useNavigate} from "react-router-dom";

export default function Registration() {
    let navigate = useNavigate();

    async function onSubmit(values) {
        const response = await register(values);
        if(response){
            localStorage.setItem("user", JSON.stringify(response))
            toast.success("Vous êtes connecté !");
            navigate(`/app/games`);
        } else {
            toast.error("Email ou mot de passe incorrect");
        }
    }

    return (
        <>
            <main>
                <h2>Inscrivez-vous</h2>
                <Formik
                    initialValues={{ email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false)
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && errors.email}
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
                <Link className='' to="/connexion">Connexion</Link>
            </main>

        </>
    );
}