import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';

export type FontAwesomeName = ComponentProps<typeof FontAwesome>['name'];
export type Tab = { title: string; icon: FontAwesomeName };

const TABS = {
  favorite: { title: 'Favorite', icon: 'star' },
  list: { title: 'List', icon: 'list' },
  camera: { title: 'Camera', icon: 'camera' },
  map: { title: 'Map', icon: 'map' },
} satisfies Record<string, Tab>;

function TabLayout(tabBarActiveTintColor = 'blue', iconSize = 28) {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor }}>
      {Object.entries(TABS).map(([name, { title, icon }]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={iconSize} name={icon} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

export default TabLayout;
