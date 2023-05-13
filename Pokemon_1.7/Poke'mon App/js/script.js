let pokemonRepository= (function(){

	let modalContainer = document.querySelector('#modal-container');

	let pokemonList= [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	function add(pokemon) {
		if (
			typeof pokemon === "object" &&
			"name" in pokemon 
		) {
		pokemonList.push(pokemon);
		} else {
			console.log("pokemon is not correct");
		}
	}
	function addlistitem(pokemon){
		let pokemon_array = document.querySelector(".pokemon-list");
		let pokemon_item = document.createElement("li");
		let button = document.createElement("button");
		button.innerText = pokemon.name;
		button.classList.add("button_style");
		button.classList.add("show-modal");
		let container = document.querySelector("div")
		container.classList.add("modal-container");

		pokemon_item.appendChild(button);
		pokemon_array.appendChild(pokemon_item);
		button.addEventListener("click", function(event) {
			showDetails(pokemon);
		});
	}

	function loadList(){
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then (function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
				console.log(pokemon);
			});
		}).catch(function (e) {
				console.error(e);
		});
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			//Now we add details to item
			item.imageUrl = details.sprites.font_default;
			item.name = details.name;
			item.height = details.height;
			item.types = details.types;
		}).catch(function (e) {
			console.error(e);
		});
	}

	function showDetails(item) {
		modalContainer.innerHTML = '';
		let modal = document.createElement('div');
		modal.classList.add('modal');
		
		// Add the new modal content
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);
		
		let pokemon = document.createElement('h1');
	
		let contentElement = document.createElement('p');
		contentElement.innerText = item.height;
		contentElement.innerText = item.types;

		modal.appendChild(closeButtonElement);
		modal.appendChild(titlePokemon);
		modal.appendChild(contentElement);
		modalContainer.appendChild(modal);
		
		modalContainer.classList.add('is-visible');
    
		loadDetails(item).then(function () {
			console.log(item);
		});
	}

	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}

	function getAll() {
		return pokemonList;
	}

	return {
		add:add,
		getAll:getAll,
		addlistitem: addlistitem,
		loadList:loadList,
		loadDetails:loadDetails,
		showDetails:showDetails
	};	

})();

// console.log(pokemonRepository.getAll());


pokemonRepository.loadList().then(function() {
// 	pokemonRepository.add({name: "Mewtwo", height: "79" , types: ["Psychic"] });
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addlistitem(pokemon);
	});
});
