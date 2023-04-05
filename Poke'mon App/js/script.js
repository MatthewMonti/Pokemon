let pokemonRepository= function(){
	let pokemonList= [
{
	name: "Bulbasaur",
	height: 28,
	types:["Overgrow"]
},
{
	name: "Squirtle",
	height: 20,
	types:["Torrent"]
},
{
	name: "Pidgey",
	height: 12,
	types:["Keen Eye", "Tangled Feet"]
},
{
	name:"Butterfree",
	height:43,
	types:["Compound Eyes"]
}
];
return{
	add: function(pokemon){
		pokemonList.push(pokemon);
	},
	getAll:function() {
	return pokemonList;
	}
};
})();
pokemonList.forEach(function(pokemon){
	console.log(pokemon);
});
