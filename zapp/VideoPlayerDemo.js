
import * as ScreenOrientation from 'expo-screen-orientation'
import { Dimensions, ScrollView, StyleSheet, Text } from 'react-native'
import { Video } from 'expo-av'
import { setStatusBarHidden } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import VideoPlayer from 'expo-video-player'

export default function VideoPlayerDemo(props) {
  //const [inFullscreen, setInFullsreen] = useState(false)
  const [inFullscreen, setInFullsreen] = useState(false)
  //const refVideo = useRef(null)
  const refVideo = useRef(null)
  const refScrollView = useRef(null)

  return (
    <ScrollView
      scrollEnabled={!inFullscreen}
      ref={refScrollView}
      onContentSizeChange={() => {
        if (inFullscreen) {
          refScrollView.current.scrollToEnd({ animated: true })
        }
      }}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: props.url //'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          ref: refVideo,
        }}
        fullscreen={{
          inFullscreen: inFullscreen,
          enterFullscreen: async () => {
            setStatusBarHidden(true, 'fade')
            setInFullsreen(!inFullscreen)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
            refVideo.current.setStatusAsync({
              shouldPlay: true,
            })
          },
          exitFullscreen: async () => {
            setStatusBarHidden(false, 'fade')
            setInFullsreen(!inFullscreen)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
          },
        }}
        style={{
          videoBackgroundColor: 'black',
          height: inFullscreen ? Dimensions.get('window').width : 160,
          width: inFullscreen ? Dimensions.get('window').height : 320,
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    height: 320,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  text: {
    marginTop: 36,
    marginBottom: 12,
  },
})

