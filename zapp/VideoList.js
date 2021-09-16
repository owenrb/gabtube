import * as React from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export class VideoList extends React.Component {
    render() {
        return (
            <FlatList
                data={this.props.list}
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <View style={styles.leftColumn}>
                            <TouchableHighlight onPress={(e) => this.props.onClick(item.url)}>
                                <Image style={styles.thumbnail} source={{ uri: this.props.base + item.thumbnail }}></Image>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.rightColumn}>
                            <Text style={styles.TextStyle} onPress={(e) => this.props.onClick(item.url)}>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </View>
                    </View>
                }
            />
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        margin: 2,
        flex: 1
    },

    leftColumn: {
        flex: 1,
        paddingRight: 25
    },

    rightColumn: {
        flex: 2,
    },


    TextStyle: {

        color: '#E91E63',
        textDecorationLine: 'underline'

    },

    thumbnail: {
        width: 125,
        height: 100,
        resizeMode: 'contain',
    }
});