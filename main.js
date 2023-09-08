const pokemonsContainer = document.getElementById('pokemonsContainter');

const getPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await response.json();
    const listPokemons = [];
    for (let index = 0; index < data.results.length; index++) {
        const pokemon = data.results[index];
        const newResponse = await fetch(pokemon.url);
        const dataPokemon = await newResponse.json();
        listPokemons.push({
            name: pokemon.name,
            image: dataPokemon.sprites.front_default,
            experience: dataPokemon.base_experience,
            height: dataPokemon.height,
            abilities: dataPokemon.abilities
        })
        
    }
    renderPokemons(listPokemons)
}

const renderPokemons = (listPokemons) => {
    console.log(listPokemons);
    pokemonsContainer.innerHTML = '';
    listPokemons.forEach(pokemon => {
        pokemonsContainer.innerHTML += `
        <article class="pokemon__card">
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.image}" alt="">
            <h3>Habilidades:</h3>
            <div class="pokemon__abilities">
                <span>overgrow</span>
                <span>chlorophyll</span>
            </div>
            <h3>Experiencia: <span>${pokemon.experience}</span></h3>
            <h3>Altura: <span>${pokemon.height}</span></h3>
       </article>
        `
    });
}

getPokemons();