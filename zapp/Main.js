import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { VideoList } from './VideoList';
import VideoPlayerMine  from './VideoPlayerMine';
import * as ScreenOrientation from 'expo-screen-orientation'

export class Main extends React.Component {

    constructor(props) {
        super(props)
        const location = props.route.params.server;
        this.state = {
            base: location,
            url: '',
            data: [],
            isLoading: true,
            hasError: false,
            errorMessage: '',
        }

        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

    }

    async getVideos() {
        const today = new Date();
        const target = this.state.base + '/list.json?_=' + today.getTime();
        try {
            const response = await fetch(target);
            if (response.ok) {

                const json = await response.json()

                const filterred = Platform.OS === 'ios' ? json.filter(v => !v.url.endsWith('.flv'))
                    : json;

                this.shuffle(filterred);
                
                this.setState({
                    data: filterred,
                    url: this.state.base + filterred[0].url
                })
            } else {
                this.setState({ hasError: true, errorMessage: response.status + ' ' +  response.statusText })
            }
        } catch (error) {
            this.setState({ hasError: true, errorMessage: target + ' --> ' + JSON.stringify(error) })
        } finally {
            this.setState({ isLoading: false });
        }
    }

    onVideoMin() {

        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
        this.props.navigation.setOptions({headerShown: true})
    }

    onVideoMax() {
       this.props.navigation.setOptions({headerShown: false})
    }

    shuffle(array) {
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    componentDidMount() {
        this.getVideos();
    }

    render() {

        const { data, base, isLoading, hasError, errorMessage } = this.state;

        if (isLoading) {
            return (<View style={styles.container}><Text>Data is loading....</Text></View>)
        }

        if (hasError) {
            return (<View style={styles.container}><Text>{errorMessage}</Text></View>)
        }

        

        return (
            <View style={styles.container}>
                <VideoPlayerMine url={this.state.url} onVideoMax={() => this.onVideoMax()} onVideoMin={() => this.onVideoMin()}/>
                
                <VideoList base={base} list={data} onClick={(newTarget) => this.setState({ url: base + newTarget })} />
            </View>
        )
    }

}

// <VideoList base={base} list={data} onClick={(newTarget) => this.setState({ url: base + newTarget })} />


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
});