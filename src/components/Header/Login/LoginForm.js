import React from "react";

export default class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        errors: {}
    };

    onChange = e => {
        this.setState({
            [e.target.name]: [e.target.value]
        });
    };

    handleBlur = () => {
        console.log("BLUR");
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            console.log("Error");
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }))
        }

    };

    validateFields = () => {
        const errors = {};

        if (this.state.username === "") {
            errors.username = "Not empty";
        }

        return errors;
    };

    onLogin = e => {
        e.preventDefault();
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            console.log("Error");
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }))
        }
    };

    render() {
        const {username, password, errors} = this.state;
        return (
            <div className="form-login-container">
                <form className="form-login">
                    <h1 className="h3 mb-3 font-weight-normal text-center">
                        Авторизация
                    </h1>
                    <div className="form-group">
                        <label htmlFor="username">Пользователь</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Пользователь"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        onClick={this.onLogin}
                    >
                        Вход
                    </button>
                </form>
            </div>
        );
    }
}