import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function VideoPlayerN(props) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  //const url = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'

  //video.playFromPositionAsync(0);

  return (
      <View>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: props.url
          }}
          useNativeControls={true}
          resizeMode="contain"
          shouldPlay={true}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />

        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
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
