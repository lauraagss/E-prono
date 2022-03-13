import * as React from "react";
import {Formik} from "formik";
import {login} from "../../../services/auth-service";
import { toast } from 'react-toastify';
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();

    async function onSubmit(values) {
        const response = await login(values);
        if(response.length > 0){
            toast.success("Vous êtes connecté !");
            navigate(`/app/games`);
        } else {
            toast.error("Email ou mot de passe incorrect");
        }
    }

    return (
        <>
            <main>
                <h2>Connectez-vous</h2>
                <p>A vos pari</p>
                <Formik
                    initialValues={{ email: '', password: '' }}
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
                        console.log("test")
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
                <Link className='' to="/inscription">Inscription</Link>
            </main>

        </>
    );
}