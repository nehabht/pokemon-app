import type { Pokemon } from '../types';

interface Props {
    pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
    return (
        <div className="pokemon-card">
            <span className="pokemon-id">#{pokemon.id.toString().padStart(4, '0')}</span>
            <div className="image-container">
                <img src={pokemon.sprites?.other?.['official-artwork']?.front_default} alt={pokemon.name} />
            </div>
            <h3 id={`pokemon-name-${pokemon.id}`} className="pokemon-name">{pokemon.name}</h3>
            <div className="types-container">
                {pokemon.types.map((t) => (
                    <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                        {t.type.name}
                    </span>
                ))}
            </div>
        </div >

    );
};

export default PokemonCard;