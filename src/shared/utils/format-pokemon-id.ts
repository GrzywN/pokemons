export function formatPokemonId(id: number, padLength = 4): string {
  return `#${String(id).padStart(padLength, '0')}`;
}
