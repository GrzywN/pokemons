import { useState } from 'react';
import { Marker } from 'react-native-maps';

import { usePokemon } from '@/features/detail';
import { Image } from '@/shared/ui/image';

export type Pin = {
  id: string;
  coordinate: { latitude: number; longitude: number };
  pokemonName: string;
};

export interface PokemonMarkerProps {
  pin: Pin;
  onPress: () => void;
  width?: number;
  height?: number;
}

export function PokemonMarker({
  pin,
  onPress,
  width = 48,
  height = 48,
}: PokemonMarkerProps) {
  const { data } = usePokemon(pin.pokemonName);
  const sprite = data?.sprites?.front_default;
  const [loaded, setLoaded] = useState(false);

  return (
    <Marker
      coordinate={pin.coordinate}
      tracksViewChanges={!loaded}
      onPress={onPress}>
      {sprite && (
        <Image
          driver="react-native"
          source={{ uri: sprite }}
          style={{ width, height }}
          onLoad={() => setLoaded(true)}
        />
      )}
    </Marker>
  );
}
