const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			characters: [],
			planets: [],
			vehicles: []
		},
		actions: {
			forceRender: () => setStore({}), // Force render without change data

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
