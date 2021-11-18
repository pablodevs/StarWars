const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			characters: [],
			planets: [],
			vehicles: [],
			loggedIn: false,
			token: null,
			message: null,
			userData: {}
		},
		actions: {
			forceRender: () => setStore({}), // Force render without change data
			forceLogin: () => {
				setStore({
					loggedIn: true,
					token: localStorage.getItem("token")
				});
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({
					loggedIn: false,
					token: null,
					userData: {},
					message: null
				});
			},
			login: async (email, password, remember) => {
				const options = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				const resp = await fetch(process.env.BACKEND_URL + "/api/token", options);
				const data = await resp.json();

				if (resp.status === 401) {
					setStore({ message: data.msg });
					return false;
				}

				if (remember === "checked") {
					localStorage.setItem("token", data.token);
				}
				setStore({
					loggedIn: true,
					token: data.token,
					message: ""
				});
				return true;
			},
			createUser: async (user_name, email, password, remember) => {
				const actions = getActions();
				const options = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						user_name: user_name,
						email: email,
						password: password
					})
				};
				const resp = await fetch(process.env.BACKEND_URL + "/user", options);
				const data = await resp.json();
				if (resp.status === 401) return false;
				actions.login(email, password, remember);
				return data;
			},
			getProfileData: async token => {
				const options = {
					method: "GET",
					headers: {
						Authorization: "Bearer " + token
					}
				};

				fetch(process.env.BACKEND_URL + "/api/user", options)
					.then(resp => resp.json())
					.then(data => {
						setStore({ userData: data });
					})
					.catch(error => console.log(error));
			},
			addFav: (category, uid) => {
				// Add likes to the Fav list
				const store = getStore();
				setStore({
					favorites: [
						...store.favorites,
						{
							category: category,
							id: uid
						}
					]
				});

				// Actualiza los likes
				let storeAux = {};
				storeAux[category] = store[category].map(element => {
					if (element.uid === uid) {
						element.liked = true;
					}
					return element;
				});
				setStore(storeAux);
			},

			removeFav: (category, uid) => {
				// Remove likes from the Fav list
				const store = getStore();
				let position;
				store.favorites.forEach((element, index) => {
					if (element.category === category && element.id === uid) {
						position = index;
					}
				});
				store.favorites.splice(position, 1);
				setStore({
					favorites: [...store.favorites]
				});

				// Upload likes
				let storeAux = {};
				storeAux[category] = store[category].map(element => {
					if (element.uid === uid) {
						element.liked = false;
					}
					return element;
				});
				setStore(storeAux);
			},

			loadData: category => {
				let endUrl = category === "characters" ? "people" : category;
				fetch(`https://www.swapi.tech/api/${endUrl}/`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(data => {
						let storeAux = {};
						storeAux[category] = data.results.map(e => {
							e.liked = false;
							e.category = category;
							return e;
						});
						setStore(storeAux);
					});
			}
		}
	};
};

export default getState;
