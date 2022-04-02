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

const DeviceItem = ({ device, type }) => {
  const isToCreate = type === "create";
  const [isVisible, setVisible] = React.useState(false);
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
            <View style={{flexDirection: 'row'}}>
              <Button
                title="Close"
                style={[styles.button, styles.buttonClose, {paddingRight: 10}]}
                onPress={() => setVisible(!isVisible)}
              />
              <Button
                title="Vote +1"
                style={[styles.button, styles.buttonClose]}
                onPress={() => setVisible(!isVisible)}
              />
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
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginRight: 15 }}>{device.name}</Text>
            <Text>{`votes: ${device.votes}`}</Text>
          </View>
          {isToCreate && (
            <Button title="+1" onPress={() => alert("+1")}>
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
