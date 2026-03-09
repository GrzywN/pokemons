import { Tabs } from 'expo-router';
import { Icon, type IconName } from '@/shared/ui/icon';

export type Tab = { title: string; icon: IconName; headerShown?: boolean };

const tabs: Record<string, Tab> = {
  favorite: { title: 'Favorite', icon: 'star' },
  list: { title: 'List', icon: 'list', headerShown: false },
  camera: { title: 'Camera', icon: 'camera' },
  map: { title: 'Map', icon: 'map' },
};

const tabEntries = Object.entries(tabs);

function TabLayout(
  tabBarActiveTintColor = 'blue',
  iconSize = 28,
  defaultHeaderShown = true
) {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor }}>
      {tabEntries.map(([name, { title, icon, headerShown }]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: headerShown ?? defaultHeaderShown,
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
