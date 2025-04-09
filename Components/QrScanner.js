import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CameraKitCameraScreen from 'react-native-camera-kit';


const QrScanner= () => {
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
console.log(CameraKitCameraScreen);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to scan QR codes',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      // iOS permissions handled via Info.plist
      return true;
    }
  };

  const handleStartScan = async () => {
    setLoading(true);
    const granted = await requestCameraPermission();
    setLoading(false);
    if (granted) {
      setShowScanner(true);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to scan QR.');
    }
  };

  const handleQRCodeScanned = (event) => {
    const code = event.nativeEvent.codeStringValue;
    Alert.alert('QR Code Scanned', code);
    setShowScanner(false); // close scanner after scan
  };

  if (showScanner) {
    return (
      <CameraKitCameraScreen
        showFrame={true}
        scanBarcode={true}
        laserColor={'#FF3D00'}
        frameColor={'#00C853'}
        onReadCode={handleQRCodeScanned}
      />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>Press button to scan QR</Text>
          <Button title="Open QR Scanner" onPress={handleStartScan} />
        </>
      )}
    </View>
  );
};

export default QrScanner;
