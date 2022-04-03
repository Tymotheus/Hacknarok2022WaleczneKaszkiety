import * as React from "react";
import { Text, View, FlatList, Image, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeviceItem from "./DeviceItem";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const baseUrl = "http://localhost:8000";

function HomeScreen({ location }) {
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
      <Text
        style={{
          backgroundColor: "white",
          width: 400,
          textAlign: "center",
          fontSize: 18,
          padding: 10,
          backgroundColor: "white",
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        Krakowski Park Technologiczny
      </Text>
      <FlatList
        data={deviceData.filter(({ type }) => type === "To fix")}
        renderItem={({ item }) => (
          <DeviceItem setDeviceData={setDeviceData} device={item} type="fix" />
        )}
      />
      <FooterComponent
        type="To fix"
        setDevice={setDeviceData}
        location={location}
      />
    </View>
  );
}

function SettingsScreen({ location }) {
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
      <Text
        style={{
          backgroundColor: "white",
          width: 400,
          textAlign: "center",
          fontSize: 18,
          padding: 10,
          backgroundColor: "white",
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        Krakowski Park Technologiczny
      </Text>
      <FlatList
        data={deviceData.filter(({ type }) => type === "To create")}
        renderItem={({ item }) => (
          <DeviceItem
            setDeviceData={setDeviceData}
            device={item}
            type="create"
          />
        )}
        ListEmptyComponent={<Text>Brak propozycji, stwórz swoją!</Text>}
        FooterComponent={<FooterComponent type="To create" />}
      />
      <FooterComponent
        type="To create"
        setDevice={setDeviceData}
        location={location}
      />
    </View>
  );
}

const FooterComponent = ({ type, setDevice, location }) => {
  const [name, setName] = React.useState("");
  const [comment, setComment] = React.useState("");
  const isFix = type === "To fix";

  const onSubmit = () => {
    fetch(`${baseUrl}/citizenly_endpoints/devices/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        comment: comment,
        type: type,
        location,
      }),
    })
      .then((response) => response.json())
      .then((data) => setDevice((prev) => prev.concat(data)));
  };
  // setDevice(prev => prev.concat(data))
  return (
    <View
      style={{
        paddingHorizontal: 50,
        paddingVertical: 10,
        width: 350,
        justifyContent: "center",
        alignItems: "center",
        // flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 20,
      }}
    >
      <Text style={{ fontSize: 24, paddingBottom: 10 }}>
        {isFix ? "Zaraportuj" : "Zaproponuj"}
      </Text>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "100%" }}>
          <TextInput
            style={{
              backgroundColor: "#DDDDDD",
              padding: 10,
              borderBottomColor: "black",
              borderBottomWidth: 1,
              width: "90%",
            }}
            type="text"
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={{ backgroundColor: "#DDDDDD", padding: 10, width: "90%" }}
            type="text"
            placeholder="Comment"
            onChangeText={(text) => setComment(text)}
          />
        </View>
        <View
          style={{
            backgroundColor: "#fedcc1",
            padding: 5,
            marginleft: 5,
            width: 44,
            height: 44,
            borderRadius: 44 / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button color="#000" title="✓" onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();
const options = {
  headerStyle: { backgroundColor: "#fedcc190" },
  headerLeft: () => (
    <Image
      style={{
        margin: 15,
        width: 80,
        height: undefined,
        aspectRatio: 21 / 9,
      }}
      source={require("./assets/Logo_transparent.png")}
    />
  ),
};

export default function Main({ location }) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{...options, title: "Do Naprawy", tabBarIcon: () => <MaterialCommunityIcons name="auto-fix" size={32} color="black" />}}>
          {() => <HomeScreen location={location} />}
        </Tab.Screen>
        <Tab.Screen name="Zagłosuj na projekt" options={{...options, title: "Zagłosuj na projekt", tabBarIcon: () => <MaterialCommunityIcons name="scoreboard" size={32} />}}>
          {() => <SettingsScreen location={location} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
