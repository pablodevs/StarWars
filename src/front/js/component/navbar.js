import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

import starwarsImage from "../../img/star-wars-logo.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState(false); // indicates if DD is showed
	const [input, setInput] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [searchDel, setSearchDel] = useState(false);
	const [selected, setSelected] = useState(-1);

	const itemsList = [...store.characters, ...store.planets, ...store.vehicles];
	let history = useHistory();
	const maxlenName = 15;

	const topFunction = () => {
		resetHooks();
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};

	const handleClickMenu = e => {
		setState(!state);
		//e.preventDefault();
	};

	const handleSearchKeyDown = e => {
		if (e.key === "Enter") {
			if (selected === -1) {
				if (input != "") {
					let userItem = itemsList.find(elem => elem.name.toLowerCase() === input.toLowerCase());
					if (userItem) {
						setSuggestions([]);
						history.push(`/details/${userItem.category}/${userItem.uid}`);
						resetHooks();
					}
				}
			} else {
				setSuggestions([]);
				setSelected(-1);
				history.push(`/details/${suggestions[selected].category}/${suggestions[selected].uid}`);
				resetHooks();
			}
		} else if (suggestions.length) {
			if (e.key === "ArrowDown") selected === suggestions.length - 1 ? setSelected(0) : setSelected(selected + 1);
			else if (e.key === "ArrowUp")
				selected === 0 || selected === -1 ? setSelected(suggestions.length - 1) : setSelected(selected - 1);
		}
	};

	const resetHooks = () => {
		setInput("");
		setSearchDel(false);
		setSuggestions([]);
		setSelected(-1);
	};

	const handleSearchOnChange = event => {
		setSearchDel(true);
		let userInput = event.target.value;
		setInput(userInput);
		let array = [];

		if (userInput != "") {
			array = itemsList.filter(element => element.name.toLowerCase().startsWith(userInput.toLowerCase()));
			setSuggestions(array);
		} else {
			setSuggestions(array);
			setSearchDel(false);
		}
	};

	const getName = (category, uid) => {
		// search the element in store[category] and returns his name.
		let index = store[category].findIndex(x => x.uid == uid);
		if (index === -1) return "";

		let nameAux = store[category][index].name;
		if (nameAux.length > maxlenName) return nameAux.slice(0, maxlenName) + "...";
		else return nameAux;
	};

	return (
		<div className="container-fluid sticky-top nav-wrapper">
			<nav className="container navbar navbar-expand-lg py-2">
				<div className="container-fluid">
					<Link to="/" onClick={topFunction}>
						<img src={starwarsImage} width="100" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<i className="fas fa-bars" style={{ color: "white", fontSize: "xx-large" }} />
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="flex-grow-1 navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link" href="#characters">
									Characters
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#planets">
									Planets
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#vehicles">
									Vehicles
								</a>
							</li>
							<li className="nav-item w-100 d-flex justify-content-center">
								<div className="dropdown">
									<a className="nav-link dropdown-toggle" onClick={handleClickMenu}>
										{`Favorites ${store.favorites.length}`}
									</a>
									<div className={`dropdown-menu ${state ? "show" : ""}`}>
										{store.favorites.length > 0 ? (
											store.favorites.map((elem, index) => (
												<div
													key={index}
													className="dropdown-item d-flex"
													style={{ width: "12em" }}>
													<Link
														onClick={resetHooks}
														className="flex-grow-1 fav-link"
														to={"/details/" + elem.category + "/" + elem.id}>
														<span className="hola">{getName(elem.category, elem.id)}</span>
													</Link>
													<button className="trash-button">
														<i
															className="fas fa-trash"
															onClick={() =>
																actions.removeFav(
																	store.favorites[index].category,
																	store.favorites[index].id
																)
															}
														/>
													</button>
												</div>
											))
										) : (
											<div className="text-center">(empty)</div>
										)}
									</div>
								</div>
							</li>
						</ul>
						<form
							className="d-flex search-form"
							onSubmit={e => e.preventDefault()}
							onKeyDown={handleSearchKeyDown}>
							<div className="search-icon">
								<i className="fas fa-search" />
							</div>
							{searchDel ? (
								<button className="search-cross-btn" onClick={resetHooks}>
									×
								</button>
							) : null}
							<input
								onChange={handleSearchOnChange}
								value={suggestions[selected] ? suggestions[selected].name : input}
								className="form-control search-input"
								type="search"
								placeholder="Search Star Wars..."
								aria-label="Search"
							/>
							<ul className="autocomplete">
								{suggestions.map((elem, idx) => {
									return (
										<li key={idx}>
											<Link
												className={`suggestion-link ${
													selected === idx ? "suggestion-active" : ""
												}`}
												to={"/details/" + elem.category + "/" + elem.uid}
												onClick={resetHooks}>
												{elem.name}
											</Link>
										</li>
									);
								})}
							</ul>
						</form>
					</div>
				</div>
			</nav>
		</div>
	);
};
