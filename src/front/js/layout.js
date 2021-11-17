import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Details } from "./views/details";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<div className="background">
						<div className="webpage">
							<Navbar />
							<Switch>
								<Route exact path="/">
									<Home />
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
						</div>
					</div>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
