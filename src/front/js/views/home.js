import React from "react";
import "../../styles/views/home.scss";
import { CardsContainer } from "../component/cardscontainer.js";

export const Home = () => (
	<div className="home-wrapper">
		<CardsContainer content="characters" />
		<CardsContainer content="planets" />
		<CardsContainer content="vehicles" />
	</div>
);
