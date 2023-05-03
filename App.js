import { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Button, Text, FlatList, Modal } from 'react-native';

export default function App() {
  const [ textItem, setTextItem ] = useState("");
  const [ list, setList ] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const onHandleChangeText = text => {
    setTextItem(text);
    console.log(text);
  };

  const addItem = () => {
    // console.log("aqui agregamos el item", textItem);
    setList(prevState => [
      ...prevState, 
      { name: textItem, id: Math.random().toString() },
    ]);
    setTextItem("");
  };

  const onHandleModal = item => {
    console.log("setear item al modal");
    setItemSelected(item);
    setModalVisible(true);
  };

  const onHandleDelete = id => {
    console.log("delete item");
    setList(prevState => prevState.filter(element => element !== id));
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.renderStyle}>
      <Text>{item.name}</Text>
      <Button
        title="Eliminar"
        onPress={() => onHandleModal(item)}
        color={"#9290DF"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        style={{width: 140, height:140, margin: 40, borderRadius:15}}
        source={require('./assets/logo_CuteDog.png')}
      />
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Elemento de la lista" 
          style={styles.input} 
          onChangeText={onHandleChangeText}
          value={textItem}
        />
        <Button
          title="Agregar a Lista"
          onPress={addItem}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View>
        <Modal visible={modalVisible} animationType='fade' transparent={false}>
          <View style={styles.modalContainer}>
            {/* <Text>Modal</Text> */}
            <View style={styles.textModal}>
              <Text style={styles.text}>Borrar Elemento?</Text>
              <Text style={styles.text}>{itemSelected.name}</Text>
            <View>
              <Button 
                title='Eliminar' 
                color={"#77625C"} 
                onPress={() => onHandleDelete(itemSelected)}
              />
            </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9C9CFA',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: 200,
  },
  flatListContainer: {
    flex: 2,
    marginHorizontal: 30,
    padding: 3,
    marginTop: 18,
  },
  renderStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 60,
    width: "100%",
    backgroundColor: "#E1F2FE",
    margin: 10,
    marginBottom: 20,
    padding: 10,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#9C9CFA',
  },
  textModal: {
    margin: 20,
  },
  text: {
    padding:10,
    textAlign: "center",
    color: "#49392C",
    fontSize: 16
  },
});
