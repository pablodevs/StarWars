import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/views/login.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [check, setCheck] = useState("checked");
	const [data, setData] = useState({
		user_name: "",
		email: "",
		password: ""
	});

	const handleOnChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value
		});
	};

	const handleCheck = () => {
		if (check === "") setCheck("checked");
		else if (check === "checked") setCheck("");
	};

	const handleSubmit = e => {
		e.preventDefault();

		actions.createUser(data.user_name, data.email, data.password, check);

		setData({ user_name: "", email: "", password: "" });
	};

	return (
		<div className="view">
			<div className="dflex-column">
				<form className="login-form" onSubmit={handleSubmit}>
					<div className="login-group">
						<label forhtml="user_nameInputRegister" className="login-label">
							Username
						</label>
						<input
							className="login-input"
							onChange={handleOnChange}
							value={data.user_name}
							type="user_name"
							name="user_name"
							id="user_nameInputRegister"
						/>
					</div>
					<div className="login-group">
						<label forhtml="emailInputRegister" className="login-label">
							Email
						</label>
						<input
							className="login-input"
							onChange={handleOnChange}
							value={data.email}
							type="email"
							name="email"
							id="emailInputRegister"
							placeholder="name@example.com"
						/>
					</div>
					<div className="login-group">
						<label forhtml="passwordInputRegister" className="login-label">
							Create a password
						</label>
						<input
							className="login-input"
							onChange={handleOnChange}
							value={data.password}
							type="password"
							name="password"
							id="passwordInputRegister"
						/>
					</div>
					<div className="login-check-group">
						<div>
							<input
								className="login-checkbox"
								type="checkbox"
								onChange={handleCheck}
								checked={check}
								value=""
								id="rememberCheckRegister"
							/>
							<label className="login-checkbox-label" forhtml="rememberCheckRegister">
								Remember me
							</label>
						</div>
					</div>
					<button className="login-button">Register</button>
				</form>
				<span className="login-message">
					Already have a user? <Link to="/login">Sign in</Link>
				</span>
			</div>
		</div>
	);
};
