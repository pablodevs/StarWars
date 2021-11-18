import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Home } from "./views/home";
import { Details } from "./views/details";
// User views:
import { Login } from "./views/login";
import { Register } from "./views/register";
import { Profile } from "./views/profile";

import injectContext, { Context } from "./store/appContext";

const Layout = () => {
	const basename = process.env.BASENAME || "";
	const { store, actions } = useContext(Context);

	return (
		<div className="page">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							{store.loggedIn ? <Redirect to="/" /> : <Login />}
						</Route>
						<Route exact path="/register">
							{store.loggedIn ? <Redirect to="/" /> : <Register />}
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/details/:category/:uid">
							<Details />
						</Route>
						<Route>
							<div className="view">
								<h5>404 - Page Not Found {/* Include Death star img */}</h5>
							</div>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
