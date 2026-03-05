import { Image } from '@/shared/ui/image';
import { StatusBar } from '@/shared/ui/status-bar';
import { formatPokemonId } from '@/shared/utils/format-pokemon-id';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { usePokemon } from '@/features/pokemon';

export default function Favorite() {
  const { data, error, isSuccess, isLoading, isError } = usePokemon();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>
          Something went wrong. Restart or try again later.
          {__DEV__ && `\n${error.name}: ${error.message}`}
        </Text>
      </View>
    );
  }

  if (!isSuccess) {
    return null;
  }

  const {
    id,
    name,
    height,
    weight,
    base_experience: baseExperience,
    sprites,
    types,
    stats,
    abilities,
  } = data;

  const formattedId = formatPokemonId(id);
  const heightInMeters = `${height / 10} m`;
  const weightInKg = `${weight / 10} kg`;
  const sprite = sprites.front_default;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />

      {sprite && <Image source={sprite} style={styles.sprite} />}

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.id}>{formattedId}</Text>

      <View style={styles.row}>
        {types.map(({ type }) => (
          <Text key={type.name} style={styles.badge}>
            {type.name}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Height</Text>
          <Text style={styles.value}>{heightInMeters}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Weight</Text>
          <Text style={styles.value}>{weightInKg}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Base EXP</Text>
          <Text style={styles.value}>{baseExperience}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Stats</Text>
      <View style={styles.section}>
        {stats.map(({ stat, base_stat: baseStat }) => (
          <View key={stat.name} style={styles.infoRow}>
            <Text style={styles.label}>{stat.name}</Text>
            <Text style={styles.value}>{baseStat}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Abilities</Text>
      <View style={styles.section}>
        {abilities.map(({ ability, is_hidden: isHidden }) => (
          <View key={ability.name} style={styles.infoRow}>
            <Text style={styles.label}>{ability.name}</Text>
            {isHidden && <Text style={styles.hidden}>hidden</Text>}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  container: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 48,
  },
  sprite: {
    width: 160,
    height: 160,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 8,
  },
  id: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 13,
    textTransform: 'capitalize',
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  section: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#444',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
  hidden: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});
