import React, {useState} from "react";
import toast from "react-hot-toast";
import {useHistory} from "react-router-dom";
import {register} from "../helpers/api";
import Helmet from "react-helmet";

interface FormData {
    email: string;
    password: string;
    passwordValidate: string;
}

interface FormErrors {
    email: string;
    password: string;
    repeatPassword?: string;
    passwordValidate: string;
}

const textCenter: React.CSSProperties = {
    textAlign: "center",
};
const errorStyle: React.CSSProperties = {
    display: 'block',
    textAlign:'end',
    maxWidth: '400px'
}
const REQUIRED = "Required";
const PASSWORD_REQUIREMENTS_MISMATCH = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number and special character";
const PASSWORDS_DO_NOT_MATCH = "Passwords do not match";

function SignUp(): JSX.Element {
    const history = useHistory();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        passwordValidate: "",
    });
    const [errors, setErrors] = useState<FormErrors>({
        email: "",
        password: "",
        repeatPassword: "",
        passwordValidate: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmpty = (value: string): string =>
        value.trim() ? "" : REQUIRED;

    const validatePassword = (password: string): string => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;
        if (!password.trim()) {
            return REQUIRED;
        }
        if (!passwordRegex.test(password)) {
            return PASSWORD_REQUIREMENTS_MISMATCH
        }
        return "";
    }

    const validate = (field: keyof FormData, value: string): void => {
        setFormData({...formData, [field]: value});

        if (field === "email") {
            setErrors({...errors, [field]: validateEmpty(value)});
        } else {
            const isPasswordField = field === "password";
            const passwordsMatch = isPasswordField
                ? value === formData.passwordValidate
                : value === formData.password;
            setErrors({
                ...errors,
                [field]: validateEmpty(value),
                repeatPassword: passwordsMatch ? "" : PASSWORDS_DO_NOT_MATCH,
            });
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const {email, password, passwordValidate} = formData;
        const emailError = validateEmpty(email);
        const passwordError = validatePassword(password);
        const passwordValidateError = !passwordValidate.trim()
            ? REQUIRED
            : password !== passwordValidate
                ? PASSWORDS_DO_NOT_MATCH
                : "";

        setErrors({
            email: emailError,
            password: passwordError,
            passwordValidate: passwordValidateError,
        });

        if (emailError || passwordError || passwordValidateError) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await register({email, password});
            if (response.message) {
                toast.error(response.message as string);
            } else {
                toast.success("Registered successfully");
                history.push("/login");
            }
        } catch (error) {
            toast.error("An error occurred while registering");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Helmet>
                <title>The Lord of the Rings API - The one API | Sign up </title>
            </Helmet>
            <p>
                <br/>
                Get your access token now by registering a free API account.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="input-group fluid">
                    <label>
                        E-Mail:{" "}
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => validate("email", e.target.value)}
                            onBlur={(e) => validate("email", e.target.value)}
                        />
                        {errors.email && <em style={errorStyle}>{errors.email}</em>}
                    </label>
                </div>
                <div className="input-group fluid">
                    <label>
                        Password:{" "}
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => validate("password", e.target.value)}
                            onBlur={(e) => validate("password", e.target.value)}
                        />
                        {errors.password && <em style={errorStyle}>{errors.password}</em>}
                    </label>
                </div>
                <div className="input-group fluid">
                    <label>
                        Repeat Password:{" "}
                        <input
                            type="password"
                            value={formData.passwordValidate}
                            onChange={(e) => validate("passwordValidate", e.target.value)}
                            onBlur={(e) => validate("passwordValidate", e.target.value)}
                        />
                        {errors.passwordValidate && <em style={errorStyle}>{errors.passwordValidate}</em>}
                    </label>
                </div>
                <div className="input-group fluid">
                    <button
                        className="primary"
                        type="submit"
                        disabled={
                            isSubmitting ||
                            !!errors.email ||
                            !!errors.password ||
                            !!errors.passwordValidate
                        }
                    >
                        Submit
                    </button>
                </div>
                <div style={textCenter}>
                    <em>{isSubmitting ? "Submitting..." : null}</em>
                    {errors.repeatPassword && <em style={errorStyle}>{errors.repeatPassword}</em>}
                </div>
            </form>
        </div>
    );
}

export default SignUp;
