import t, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {
  useEffect(() => {
    const checkPermission = async () => {
      const result = await request(PERMISSIONS.IOS.CAMERA); // Request camera permission
      if (result === RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
        Alert.alert(
          'Permission Denied',
          'You cannot use this app without camera permission',
          [{ text: 'OK' }]
        );
      }
    };

    checkPermission(); // Call the function when the app is loaded
  }, []);

  return (
    <View>
      <Text>Shoplifting Detection App</Text>
    </View>
  );
};

export default App;
