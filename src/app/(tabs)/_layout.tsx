import { Tabs } from "expo-router";
import { ChartPie, House } from "lucide-react-native";
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <ChartPie size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
