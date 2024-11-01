import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../componont/color'

export const Startpage = ({navigation}) => {
const functions = () =>{
        navigation.navigate('Home');
}
  return (
    <LinearGradient 
      colors={['green', 'transparent']}  
      style={styles.main}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 0.7}}
    >
      <View style={styles.body}>
        <StatusBar style='light'/>
      <Image style={styles.bdyimage} source={require('../assets/loginimage2.png')}></Image>

        <Text style={styles.text1}>Welcome To SnipTask</Text>
        <Text style={styles.text2}>Empower your productivity{'\n'}your tasks your way</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={functions}>
          <View style={styles.buttons}>
            <Text style={styles.btntext}>Get Start</Text>  
            <AntDesign
            name="arrowright"
            style={styles.searchicon}
            size={24}
            color="black"
          />
          </View>
        </TouchableOpacity>
        <Text style={{top: 70,color: '#21252A',opacity: 0.2}}>Developed By Dilshan</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  body:{
    width: 400,
    height: 'auto',
    alignItems: 'center',
    marginTop: 50,
  },
  text1: {
    fontSize: 30,
    color: COLORS.black,
    fontWeight: 'bold',
    top: 199,
  },
  text2: {
    fontSize: 17,
    color: COLORS.black,
    fontWeight: "normal",
    textAlign: 'center',
    top: 210,
    opacity: 0.5
   
  },
  button: {
    width: 240,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    top: '34%',
  },
  buttons: {
    fontSize: 15,
    width: 280,
    padding: 17,
    textAlign: 'center',
    backgroundColor: '#05B815',
    borderRadius: 10,
    flexDirection: 'row'
  },
  btntext:{
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'normal',
    left: 70,
  },
  searchicon:{
    left: 130,
    top: 2,
    color: 'white',
  },
  bdyimage:{
    width: 400,
    height: 350,
    opacity: 0.8,
    marginTop: -220,
    zIndex: 0,
    position: 'absolute',
  }
});

export default Startpage;
