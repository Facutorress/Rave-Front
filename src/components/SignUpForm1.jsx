/* =======================================================
    Form 1 on SignUp view

    Fields: mail - password - passwordConfirm
    
*/

// Hooks
import { useToggle } from "../functions/customHooks";

// React icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// React Redux
import { connect } from "react-redux";

// Validation schemas
const validationSchema = Yup.object().shape({
    // Falta validación mail ya existe
    mail: Yup.string()
        .email("El mail no es valido.")
        .required("Este campo es requerido."),
    password: Yup.string()
        .min(8, "Debe tener al menos 8 caracteres")
        .matches(
            /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
            "Debe tener al menos un número y no debe contener caracteres especiales."
        )
        .required("Este campo es requerido."),
    passwordConfirm: Yup.string()
        .required("Este campo es requerido.")
        .test(
            "password-match",
            "Las contraseñas no coinciden",
            function (value) {
                return this.parent.password === value;
            }
        ),
});

const SignUpForm1 = ({ callBack, userSignError, removeSignUserError }) => {
    // Show password
    const [isPasswordShow, toggleShowPassword] = useToggle();

    // App login
    const initialValues = {
        mail: "",
        password: "",
        passwordConfirm: "",
    };

    const handleNext = (values, { setSubmitting, resetForm }) => {
        callBack({ mail: values.mail, password: values.password });
        setSubmitting(false);
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleNext}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, touched, errors, values }) => (
                <Form>
                    <h2 className="text-xl text-center my-4">Crear cuenta</h2>

                    {userSignError && (!touched.mail || !values.mail) && (
                        <div className="flex justify-center flex-row my-1">
                            <span className="errorMessage">
                                {userSignError}
                            </span>
                        </div>
                    )}
                    {/* mail */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="mail"
                            className="block my-1 font-semibold"
                        >
                            mail:
                        </label>
                        <Field
                            className={
                                touched.mail && errors.mail
                                    ? "inputError"
                                    : touched.mail && !errors.mail
                                    ? "inputSuccess"
                                    : "input"
                            }
                            type="text"
                            on
                            placeholder="Tu mail"
                            name="mail"
                            autoComplete="false"
                        />
                        <ErrorMessage
                            name="mail"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="password"
                            className="block my-1 font-semibold"
                        >
                            Contraseña:
                        </label>
                        <div className="relative w-full">
                            <Field
                                className={
                                    touched.password && errors.password
                                        ? "inputError"
                                        : touched.password && !errors.password
                                        ? "inputSuccess"
                                        : "input"
                                }
                                type={isPasswordShow ? `text` : `password`}
                                name="password"
                                placeholder="Tu contraseña"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <button
                                    onClick={toggleShowPassword}
                                    type="button"
                                >
                                    {isPasswordShow ? (
                                        <AiFillEyeInvisible
                                            size="1.5rem"
                                            color="#c026d3"
                                            // color="#18181b"
                                        />
                                    ) : (
                                        <AiFillEye
                                            size="1.5rem"
                                            color="#c026d3"
                                            // color="#18181b"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* Password Confirm */}
                    <div className="flex flex-col my-2">
                        <label
                            htmlFor="passwordConfirm"
                            className="block my-1 font-semibold"
                        >
                            Confirmar contraseña:
                        </label>

                        <Field
                            className={
                                touched.password && errors.password
                                    ? "inputError"
                                    : touched.password && !errors.password
                                    ? "inputSuccess"
                                    : "input"
                            }
                            type={isPasswordShow ? `text` : `password`}
                            name="passwordConfirm"
                            placeholder="Repetí tu contraseña"
                        />
                        <ErrorMessage
                            name="passwordConfirm"
                            component="span"
                            className="errorMessage"
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col mt-4">
                        <button
                            type="submit"
                            className="btnPrimary"
                            disabled={isSubmitting}
                        >
                            Siguiente
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

const mapStateToProps = (state) => {
    return {
        userSignError: state.userSignError,
    };
};

export default connect(mapStateToProps, null)(SignUpForm1);
