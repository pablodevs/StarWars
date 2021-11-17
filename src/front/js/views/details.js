import React, { useContext } from "react";
import "../../styles/views/details.scss";
import notfound from "../../img/notfound.png";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Details = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	let baseurl = `https://starwars-visualguide.com/assets/img/${params.category}`;
	return store[params.category].map(element => {
		if (element.uid === params.uid) {
			return (
				<div className="container section" key={Math.floor(Math.random() * 10000)}>
					<div className="row">
						<div className="col-lg-6 col-12 details-content">
							<img
								src={`${baseurl}/${element.uid}.jpg`}
								onError={e => {
									e.target.style.height = "100%";
									e.target.style.objectFit = "cover";
									e.target.src = notfound;
								}}
								className="details-img"
							/>
						</div>
						<div className="col-lg-6 col-12 details-content">
							<h4 className="details-title mb-3">{element.name}</h4>
							<div className="details-description">
								<p className="mb-3">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
									pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
									deserunt mollit anim id est laborum.
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});
};
