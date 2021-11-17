import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			if (window.localStorage["store"] !== undefined) {
				state.store = JSON.parse(localStorage.getItem("store"));
				state.actions.forceRender();
			} else {
				state.actions.loadData("characters"); // render Characters
				state.actions.loadData("planets"); // render Planets
				state.actions.loadData("vehicles"); // render Vehicles
			}
		}, []);

		useEffect(() => localStorage.setItem("store", JSON.stringify(state.store)));

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
