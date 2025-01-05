import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const checkPermission = async () => {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
        Alert.alert(
          'Permission Denied',
          'You cannot use this app without camera permission',
          [{ text: 'OK' }]
        );
      }
    };

    checkPermission();
  }, []);

  const handleStartRecording = () => {
    if (camera) {
      camera.recordAsync().then(data => {
        console.log('Recording started', data);
      });
    }
  };

  const handleStopRecording = () => {
    if (camera) {
      camera.stopRecording().then(data => {
        console.log('Recording stopped', data);
      });
    }
  };

  let camera = null;

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        captureAudio={true}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Shoplifting Detection</Text>
        <Button title="Start Recording" onPress={handleStartRecording} />
        <Button title="Stop Recording" onPress={handleStopRecording} />
      </RNCamera>
    </View>
  );
};

export default App;
