import { View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {

  const navigationToBack = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{ height: 1000, backgroundColor: 'black' }}>
      <View style={styles.header}>
        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', top: 0 }}>
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={navigationToBack}>
            <Ionicons name='arrow-back' size={25} color={'white'} />
          </TouchableOpacity>
          <Ionicons name='search' size={20} style={{ alignSelf: 'center', right: -45, zIndex: 1,color: 'white'}} />
          <TextInput
            style={styles.searchBox}
            placeholder='search'
            placeholderTextColor='white'
            fontSize={15}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    alignItems: 'center',
  },
  searchBox: {
    width: '84%',
    backgroundColor: '#424442',
    borderRadius: 25,
    padding: 8,
    margin: 10,
    paddingHorizontal: 50,
    color: 'white',
  },
});

export default SearchScreen;
