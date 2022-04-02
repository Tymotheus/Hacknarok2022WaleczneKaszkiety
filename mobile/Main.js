import * as React from "react";
import { Text, View, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeviceItem from "./DeviceItem";

const baseUrl = "http://localhost:8000";

function HomeScreen() {
  const [deviceData, setDeviceData] = React.useState([]);
  React.useEffect(() => {
    fetch(`${baseUrl}/citizenly_endpoints/devices/by-location/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location_id: 1 }),
    })
      .then((response) => response.json())
      .then((data) => setDeviceData((prev) => prev.concat(data)));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={deviceData.filter(({ type }) => type === "To fix")}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

function SettingsScreen() {
  const [deviceData, setDeviceData] = React.useState([]);
  React.useEffect(() => {
    fetch(`${baseUrl}/citizenly_endpoints/devices/by-location/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location_id: 1 }),
    })
      .then((response) => response.json())
      .then((data) => setDeviceData((prev) => prev.concat(data)));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={deviceData.filter(({ type }) => type !== "To freate")}
        renderItem={({ item }) => <DeviceItem device={item} type="create" />}
        ListEmptyComponent={<Text>No devices to create</Text>}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="To Fix" component={HomeScreen} />
        <Tab.Screen name="To Create" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
