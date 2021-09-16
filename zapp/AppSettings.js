import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet, Image, TouchableHighlight } from 'react-native';


export function AppSettings({navigation}) {

    //const [location, onChangeText] = React.useState("http://juljan.local/gabtube");
    const [location, onChangeText] = React.useState("http://192.168.1.3/gabtube");

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Server URL</Text>
            <TextInput style={styles.input} value={location} onChangeText={onChangeText}/>
            <Button title="      Enter      " onPress={() => navigation.push('Spotlight', {server: location})} />
            <Text></Text>
            <TouchableHighlight onPress={() => navigation.push('Spotlight', {server: location})}>
                <Image style={styles.thumbnail} source={require('../asset/shells.jpeg')}></Image>
            </TouchableHighlight>
            <Text>version 1.0.0</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 250,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    thumbnail: {
        width: 550,
        height: 300,
        resizeMode: 'contain',
    }
  });