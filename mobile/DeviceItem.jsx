import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";


const OnVotePress = (deviceId, callback) => {
  console.log(deviceId);
  fetch(
    `http://172.20.15.67:8000/citizenly_endpoints/devices/${deviceId}/vote-device/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: 1 }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.error_message);
      if (data.error_message) {
        alert('Zagłosowłeś już!!!');
        throw new Error(data.error_message);
      }
    })
    .then(() => callback());
};

const DeviceItem = ({ setDeviceData, device, type }) => {
  const isToCreate = type === "create";
  const [isVisible, setVisible] = React.useState(false);

  const onPressVote = (item) => {
    try {
      OnVotePress(device.id, () =>
        setDeviceData((prev) => {
          return prev.map((item) => {
            if (item.id === device.id) {
              return {
                ...item,
                votes: item.votes + 1,
              };
            }
            return item;
          });
        })
      );
    } catch (error) {
      console.error(error);
      alert('Zagłosowłeś już!!!');
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(!isVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{device.name}</Text>
            <Text style={styles.modalText}>{`votes: ${device.votes}`}</Text>
            <Text style={styles.modalText}>{device.comment}</Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Close"
                style={[
                  styles.button,
                  styles.buttonClose,
                  { paddingRight: 10 },
                ]}
                onPress={() => setVisible(!isVisible)}
              />
              {isToCreate && <Button
                title="Vote +1"
                style={[styles.button, styles.buttonClose]}
                onPress={onPressVote}
              />}
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        // style={[styles.button]}
        onPress={() => setVisible(!isVisible)}
      >
        <View style={styles.wrapper}>
          {/* <Modal isVisible={isVisible} /> */}
          <View style={{ flexDirection: "column" }}>
            <Text style={{ marginRight: 15, fontWeight: 'bold' }}>{device.name}</Text>
            <Text style={{fontWeight: '300'}}>{`votes: ${device.votes}`}</Text>
          </View>
          <Text numberOfLines={1} style={{width: '50%', overflow: 'hidden'}}>
            {device.comment}
          </Text>
          {isToCreate && (
            <Button title="+1" onPress={onPressVote}>
              +1
            </Button>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 350,
    height: 60,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default DeviceItem;
