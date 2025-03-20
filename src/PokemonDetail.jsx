import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";

const PokemonDetail = () => {
  const { id } = useParams(); // Obtener el ID del Pokémon de la URL
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-detail">
      <button onClick={() => navigate("/")} className="back-button">
        Back to List
      </button>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="details">
        <p>
          <strong>Height:</strong> {pokemon.height / 10} m
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight / 10} kg
        </p>
        <p>
          <strong>Types:</strong>
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="type-badge"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {type.type.name}
            </span>
          ))}
        </p>
        <p>
          <strong>Abilities:</strong>
          {pokemon.abilities.map((ability, index) => (
            <span key={index} className="ability">
              {ability.ability.name}
            </span>
          ))}
        </p>
        <p>
          <strong>Stats:</strong>
          <ul>
            {pokemon.stats.map((stat, index) => (
              <li key={index}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </p>
      </div>
    </div>
  );
};

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export default PokemonDetail;