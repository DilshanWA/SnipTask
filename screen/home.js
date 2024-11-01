import React, { useState, useRef, useEffect } from 'react';
import {View,TextInput,StyleSheet,Text,TouchableOpacity,TouchableWithoutFeedback,ScrollView,Modal,FlatList,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Foundation, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

const Home = () => {
  const navigation = useNavigation();
  const [isBoxVisible, setModalVisible] = useState(false);
  const [InputEmpty, setInputValue] = useState('');
  const [saveItem, setSaveItem] = useState([]);
  const [isChecked, setChecked] = useState([]);
  const [footerVisible, setFooterVisible] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [isEditing, setIsEditing] = useState(false);


  const handleSearchPress = () => {
    navigation.navigate('search');
  };

  const handlebox = () => {
    setModalVisible(!isBoxVisible);
    handleFotter();
  };

  const handleFotter = () => {
    setFooterVisible(!footerVisible);
  };

  const handleInputs = (text) => {
    setInputValue(text);
  };

  const closbox = () => {
    setInputValue('');
    setModalVisible(!isBoxVisible);
    setFooterVisible(!footerVisible);
    setIsEditing(false); 
  };

  const handlesave = () => {
    if (InputEmpty.trim() !== '') {
      setSaveItem((prevItems) => [...prevItems, { text: InputEmpty, id: Date.now() }]);
      setChecked((prevStates) => [...prevStates, false]);
      setInputValue('');
    }
    closbox();
    setFooterVisible(!footerVisible);
  };

  const slidebaralert = () => {
    alert("This Feature is Not Available");
  };

  const handleCheckboxChange = (index) => {
    setChecked((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleDelete = () => {
    const updatedItems = saveItem.filter((item, index) => !isChecked[index]);
    setSaveItem(updatedItems);
    setChecked(updatedItems.map(() => false));
  };
  

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(saveItem[index].text);
    setIsEditing(true);
    handlebox();
  };

  const handleUpdate = () => {
    if (editText.trim() !== '') {
      setSaveItem((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[editingIndex].text = editText;
        return updatedItems;
      });
      setEditingIndex(null);
      setEditText('');
    }
    closbox();
  };

  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => startEditing(index)}>
      <View style={styles.innerItem}>
        <TouchableOpacity onPress={() => handleCheckboxChange(index)}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked[index]}
            onValueChange={() => handleCheckboxChange(index)}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.innerText,
            isChecked[index] ? { textDecorationLine: 'line-through', color: 'gray' } : null,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const isAnyCheckboxSelected = isChecked.some((value) => value);

  return (
    <SafeAreaView style={styles.Safecontainer}>
      <StatusBar hidden={false} style="light" />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}> SnipTask</Text>
              <TouchableOpacity style={{ alignSelf: 'center' }} onPress={slidebaralert}>
                <Ionicons name="menu" style={{ color: 'white' }} size={24} color="black" />
              </TouchableOpacity>
            </View>
            <FontAwesome name="search" style={styles.searchicon} size={24} color="white" />
            <TouchableOpacity style={styles.searchBox} onPressIn={handleSearchPress}>
              <TextInput
                placeholder="Search Something"
                onTouchStart={handleSearchPress}
                placeholderTextColor={'white'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            {saveItem.length > 0 && (
              <View style={{ marginTop: 1 }}>
                <Text style={{ letterSpacing: 5, top: -15, color: 'white' }}>UPCOMING</Text>
                <FlatList
                  data={saveItem}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            )}
          </View>
        </View>
        
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footertext} onPress={handlebox}>
            +
          </Text>
        </TouchableOpacity>
        <View style={styles.fotterIcon}>
          {isAnyCheckboxSelected && (
            <TouchableOpacity onPress={handleDelete}>
              <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="trash" style={{ color: 'red' }} size={35} visible={true} />
                <Text style={{ color: 'white' }}>Delete</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={slidebaralert}>
            <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Foundation name="clipboard-notes" style={{ color: '#fff' }} size={35} />
              <Text style={{ color: 'white' }}>Note</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="checkmark-done-circle" style={styles.noteIcon} size={35} />
              <Text style={{ color: 'white' }}>To do </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={isBoxVisible} onRequestClose={handlebox}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editText}
                onChangeText={(text) => setEditText(text)}
                placeholder="Type here..."
                placeholderTextColor='white'
              />
            ) : (
              <TextInput
                style={styles.input}
                value={InputEmpty}
                onChangeText={handleInputs}
                placeholder="Type here..."
                placeholderTextColor='white'
              />
            )}

            <View style={styles.textbox2}>
              <TouchableOpacity onPress={closbox}>
                <Text
                  style={{
                    color: 'white',
                    backgroundColor: 'red',
                    fontWeight: 'bold',
                    borderRadius: 5,
                    padding: 10,
                    width: 70,
                    textAlign: 'center',
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    backgroundColor: 'green',
                    fontWeight: 'bold',
                    borderRadius: 5,
                    padding: 10,
                    width: 70,
                    textAlign: 'center',
                  }}
                  onPress={isEditing ? handleUpdate : handlesave}
                >
                  {isEditing ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  Safecontainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flex: 0,
    alignItems: 'center',
  },
  headerTitle: {
    width: '90%',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBox: {
    width: '90%',
    height: 50,
    backgroundColor: '#424442',
    borderRadius: 7,
    padding: 15,
    margin: 10,
    color: 'white',
    placeholderColor: 'green',
    fontSize: 15,
  },
  searchicon: {
    top: 46,
    zIndex: 1,
    left: 140,
    opacity: 0.5,
  },
  body: {
    flex: 0.9,
    alignItems: 'center',
    top: 30,
    width: '100%',
  },
  footer: {
    flex: 0.13,
    elevation: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#424442',
    elevation: 5,
  },
  footertext: {
    fontSize: 50,
    zIndex: 5,
    width: 70,
    height: 70,
    marginTop: -30,
    top: -60,
    borderRadius: 50,
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'green',
  },
  fotterIcon: {
    width: 300,
    marginTop: -35,
    height: 70,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteIcon: {
    color: 'green',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#2A2D2A',
    padding: 20,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    alignItems: 'center',
    elevation: 5,
  },
  input: {
    width: '100%',
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#424442',
    borderRadius: 6,
    padding: 12,
    marginVertical: 10,
  },
  textbox2: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  innerItem: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#424442',
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerText: {
    fontSize: 18,
    width: 260,
    color: 'white',
    left: 5,
    fontWeight: 'normal',
    overflow: 'scroll',
  },
  checkbox: {
    borderRadius: 7,
    width: 22,
    height: 22,
    marginHorizontal: 10,
  },
});

export default Home;
