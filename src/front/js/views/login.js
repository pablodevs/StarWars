import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/views/login.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [check, setCheck] = useState("checked");
	const [data, setData] = useState({
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

		actions.login(data.email, data.password, check);

		setData({
			...data,
			password: ""
		});
	};

	return (
		<div className="view">
			<div className="dflex-column">
				<form className="login-form" onSubmit={handleSubmit}>
					<div className="login-group">
						<label forhtml="emailInput" className="login-label">
							Email
						</label>
						<input
							className="login-input"
							onChange={handleOnChange}
							value={data.email}
							type="email"
							name="email"
							id="emailInput"
							placeholder="name@example.com"
						/>
					</div>
					<div className="login-group">
						<label forhtml="passwordInput" className="login-label">
							Password
						</label>
						<input
							className="login-input"
							onChange={handleOnChange}
							value={data.password}
							type="password"
							name="password"
							id="passwordInput"
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
								id="rememberCheck"
							/>
							<label className="login-checkbox-label" forhtml="rememberCheck">
								Remember me
							</label>
						</div>
						<span className="login-error">{store.message}</span>
					</div>
					<button className="login-button">Login</button>
				</form>
				<span className="login-message">
					Don&apos;t have an account yet? <Link to="/register">Register now</Link>
				</span>
			</div>
		</div>
	);
};
