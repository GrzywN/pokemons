import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { MapPage } from '@/features/map';
import { PokemonDetail } from '@/features/detail';
import { BottomSheet } from '@/shared/ui/bottom-sheet';

export default function MapScreen() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const hasSelectedPokemon = selectedPokemon != null;

  return (
    <View style={styles.container}>
      <MapPage onSelectPokemon={setSelectedPokemon} />
      <BottomSheet
        visible={hasSelectedPokemon}
        onClose={() => setSelectedPokemon(null)}>
        {hasSelectedPokemon && <PokemonDetail nameOrId={selectedPokemon} />}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
