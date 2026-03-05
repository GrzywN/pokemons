import { z } from 'zod';

const PokemonTypeNameSchema = z.enum([
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]);

const PokemonSpritesSchema = z.object({
  front_default: z.string().nullable(),
  front_shiny: z.string().nullable(),
  back_default: z.string().nullable(),
  back_shiny: z.string().nullable(),
});

const PokemonStatSchema = z.object({
  base_stat: z.number(),
  stat: z.object({ name: z.string() }),
});

const PokemonTypeSlotSchema = z.object({
  slot: z.number(),
  type: z.object({ name: PokemonTypeNameSchema }),
});

const PokemonAbilitySchema = z.object({
  ability: z.object({ name: z.string() }),
  is_hidden: z.boolean(),
  slot: z.number(),
});

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  base_experience: z.number(),
  sprites: PokemonSpritesSchema,
  types: z.array(PokemonTypeSlotSchema),
  stats: z.array(PokemonStatSchema),
  abilities: z.array(PokemonAbilitySchema),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export const PokemonListRawPageSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});

export type PokemonListItem = {
  id: number;
  name: string;
  spriteUrl: string;
};

export type PokemonListPage = {
  count: number;
  next: string | null;
  results: PokemonListItem[];
};
