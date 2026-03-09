import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { LongPressEvent } from 'react-native-maps';

import { useFavoritePokemon } from '@/shared/pokemon';

import { PokemonMarker, type Pin } from './pokemon-marker';

export interface MapPageProps {
  onSelectPokemon: (name: string) => void;
  provider?: 'google';
}

export function MapPage({
  onSelectPokemon,
  provider = 'google',
}: MapPageProps) {
  const { favorite } = useFavoritePokemon();
  const [pins, setPins] = useState<Pin[]>([]);

  function handleLongPress(event: LongPressEvent) {
    if (favorite == null) {
      return;
    }

    const { coordinate } = event.nativeEvent;

    setPins((prev) => [
      ...prev,
      { id: `${Date.now()}`, coordinate, pokemonName: favorite },
    ]);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={provider}
        onLongPress={handleLongPress}>
        {pins.map((pin) => (
          <PokemonMarker
            key={pin.id}
            pin={pin}
            onPress={() => onSelectPokemon(pin.pokemonName)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
