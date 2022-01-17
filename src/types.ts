export type PokemonBasic = {
  id: string;
  name: string;
  url: string;
};

export type Sprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

export type Pokemon = {
  name: string;
  url: string;
  height: number;
  weight: number;
  baseExperience: number;
  sprites: Sprites;
};

export type PokemonsData = {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
};

export type PersistedState = {
  pokeDeck?: PokemonBasic[];
} | null;
