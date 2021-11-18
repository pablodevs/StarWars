import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/views/profile.scss";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();

	useEffect(
		() => {
			let localToken = localStorage.getItem["token"] || store.token;
			if (localToken) actions.getProfileData(localToken);
			else history.push("/");
		},
		[store.token]
	);

	return (
		<div className="view">
			{store.userData.email ? (
				<div className="profile-container">
					<ul>
						<li>Welcome again {store.userData.user_name}</li>
						<li>
							email:&nbsp;&nbsp;&nbsp;&nbsp;
							<span>{store.userData.email}</span>
						</li>
						<li>
							id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<span>{store.userData.id}</span>
						</li>
					</ul>
				</div>
			) : null}
		</div>
	);
};
