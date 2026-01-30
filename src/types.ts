export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
}

export interface PokemonListResponse {
    results: {
        name: string;
        url: string;
    }[];
}