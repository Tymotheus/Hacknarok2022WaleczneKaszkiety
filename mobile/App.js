import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import QrCodeScanner from './QrCodeScanner';
import Main from './Main';

export default function App() {
  const [data, setData] = useState(null);
  const [scanned, setScanned] = useState(false);
  
    if(!scanned) return (
      <QrCodeScanner scanned={scanned} setScanned={setScanned} data={data} setData={setData} />
    )
    return (
      <Main />
    )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    // aspectRatio: 1,
  },
  button: {
    position: 'absolute',
    bottom: 100,
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});
