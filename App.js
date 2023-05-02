import { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Button, Text, FlatList } from 'react-native';

export default function App() {
  const [ textItem, setTextItem ] = useState("");
  const [ list, setList ] = useState([]);

  const onHandlerChangeText = text => {
    setTextItem(text);
    console.log(text);
  };

  const addItem = () => {
    setList(prevState => [
      ...prevState, 
      { name: textItem, id: Math.random().toString() },
    ]);
    setTextItem("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.flatListContainer}>
      <Text>{item.name}</Text>
      <Button
        title="Eliminar"
        onPress={() => console.log("Aqui abre Modal")}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        style={{width: 200, height:200}}
        source={require('./assets/logo_CuteDog.png')}
      />
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='elemento de la lista' 
          style={styles.input} 
          onChangeText={onHandlerChangeText}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: 20
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    height: 60,
    margin: 12,
    padding: 5,
    borderRadius: 10,
  }
});
