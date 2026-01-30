import { useEffect, useState } from 'react';
import type { Pokemon, PokemonListResponse } from '../types';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        if (!response.ok) throw new Error('Errore nel caricamento dei dati');
        
        const data: PokemonListResponse = await response.json();

        const detailPromises = data.results.map(async (p) => {
          const res = await fetch(p.url);
          return res.json();
        });

        const results = await Promise.all(detailPromises);
        setPokemons(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore sconosciuto');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <div className="message">Caricamento in corso...</div>;
  if (error) return <div className="message error">{error}</div>;

  return (
    <main className="pokemon-wrapper">
      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </main>
  );
};

export default PokemonList;
