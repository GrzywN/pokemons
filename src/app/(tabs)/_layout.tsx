import { Tabs } from 'expo-router';
import { Icon, type IconName } from '@/shared/ui/icon';

export type Tab = { title: string; icon: IconName };

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
              <Icon size={iconSize} name={icon} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

export default TabLayout;
