document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.input');
    const inputButton = document.querySelector('.input-button');
    const pokemonImg = document.querySelector('.pokemon-img');
    const pokemonName = document.querySelector('.pokemon-name');
    const pokemonID = document.querySelector('.pokemon-id');
    const pokemonHeight = document.querySelector('.pokemon-height');
    const pokemonWeight = document.querySelector('.pokemon-weight');
    const pokemonType = document.querySelector('.pokemon-type');
    const pokemonInfos = document.getElementById('pokemon-infos');
    const buttonLeft = document.querySelector('.button__left');
    const buttonRight = document.querySelector('.button__right');
    const buttons = document.getElementById('main__buttons');
    const msgLoading = document.getElementById('loading');
    const msgError = document.getElementById('error');
    let idPokemonAtual = 1;

    const fetchPokemon = async (idPokemon) => {
        exibirLoading();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
            
            if(!response.ok) throw new Error('404 NOT FOUND - Pokémon não encontrado!');

            const pokemon = await response.json();
            preencherPokemonInfo(pokemon);
            msgError.classList.add('hidden');
            pokemonInfos.classList.remove('hidden');
            buttons.classList.remove('hidden');
        } catch (error) {
            exibirErro();
        } finally {
            ocultarLoading();
        }
    };

    const preencherPokemonInfo = (pokemon) => {
        pokemonImg.src = pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonName.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}`;
        pokemonID.textContent = `(#${pokemon.id})`;
        pokemonHeight.textContent = `${pokemon.height / 10}m`;
        pokemonWeight.textContent = `${pokemon.weight / 10}kg`
        pokemonType.textContent = `${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}`;

        idPokemonAtual = pokemon.id;
        attButton();
        attButtonRight();
        input.value = '';
    };

    const exibirLoading = () => {
        msgLoading.classList.remove('hidden');
        pokemonInfos.classList.add('hidden');
        msgError.classList.add('hidden');
        buttons.classList.add('hidden');
    }

    const ocultarLoading = () => {
        msgLoading.classList.add('hidden');
    }

    const exibirErro = () => {
        pokemonName.textContent = '';
        pokemonID.textContent = '';
        pokemonImg.src = '';
        msgError.classList.remove('hidden');
        pokemonInfos.classList.add('hidden');
        buttons.classList.add('hidden');
    }

    const attButton = () => {
        buttonLeft.disabled = (idPokemonAtual <= 1);
    };

    const attButtonRight = () => {
        buttonRight.disabled = (idPokemonAtual >= 1025);
    };

    const disableSearchButton = () => {
        inputButton.disabled = !input.value.trim();
    };

    inputButton.addEventListener('click', () => {
        const query = input.value.trim().toLowerCase();
        if (query) {
            fetchPokemon(query);
        }
    });

    input.addEventListener('input', disableSearchButton);

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            inputButton.click();
        }
    });

    buttonLeft.addEventListener('click', () => {
        if (idPokemonAtual > 1 ) {
            fetchPokemon(idPokemonAtual - 1);
        }
    });

    buttonRight.addEventListener('click', () => {
        fetchPokemon(idPokemonAtual + 1);
    });

    fetchPokemon(idPokemonAtual);
    attButton();
});