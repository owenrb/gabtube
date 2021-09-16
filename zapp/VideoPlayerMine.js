
import * as ScreenOrientation from 'expo-screen-orientation'
import { Dimensions, View, StyleSheet, Text } from 'react-native'
import { Video } from 'expo-av'
import { setStatusBarHidden } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import VideoPlayer from 'expo-video-player'


export default function VideoPlayerMine(props) {
  const video = useRef(null);
  const [inFullscreen, setInFullsreen] = useState(false)
  //const url = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'

  //video.playFromPositionAsync(0);

  return (
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: props.url,
          },
          ref: video,
        }}
        fullscreen={{
          inFullscreen: inFullscreen,
          enterFullscreen: async () => {
            setStatusBarHidden(true, 'fade')
            setInFullsreen(!inFullscreen)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
            video.current.setStatusAsync({
              shouldPlay: true,
            })
            props.onVideoMax();
          },
          exitFullscreen: async () => {
            setStatusBarHidden(false, 'fade')
            setInFullsreen(!inFullscreen)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
            props.onVideoMin();
          },
        }}
        style={{
          videoBackgroundColor: 'black',
          height: inFullscreen ? Dimensions.get('window').width : 200,
          width: inFullscreen ? Dimensions.get('window').height : Dimensions.get('window').width,
        }}
      />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
