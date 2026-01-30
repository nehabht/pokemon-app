import { useEffect, useState } from 'react';

import type { Pokemon, PokemonListResponse } from './types';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Errore nel recupero dei dati del Pokédex');
        }
        
        const data: PokemonListResponse = await response.json();

        console.log('Pokémon lista:', data.results);

      
     
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore imprevisto');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <div className="status-message">Caricamento Pokédex...</div>;
  if (error) return <div className="status-message error">{error}</div>;

  return (
    <div className="app-container">
      <header className="header">
        <h1>Pokédex</h1>
      </header>

      <main className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
            <div className="image-container">
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default} 
                alt={pokemon.name} 
              />
            </div>
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <div className="types-container">
              {pokemon.types.map((t) => (
                <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;