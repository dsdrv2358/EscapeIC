import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity, Text } from 'react-native';

export default function App() {
  const [pieceVisible, setPieceVisible] = useState(true);
  const [puzzleVisible, setPuzzleVisible] = useState(false);

  function popUpPuzzle() {
    setPieceVisible(false);
    setPuzzleVisible(true);
  }

  return (
    <ImageBackground
      source={require('./greatwallJohn.png')}
      style={styles.container}
      resizeMode="stretch"
    >
      <View style={styles.innerContainer}>
        {pieceVisible && (
          <TouchableOpacity onPress={popUpPuzzle}>
            <Image 
              source={require('./assets/puzzle-images/puzzlePieces.png')}
              style={styles.puzzlePiece}
            />
          </TouchableOpacity>
        )}

        {puzzleVisible && (
          <View>
          <Image 
            source={require('./assets/puzzle-images/JohnPuzzleBorder.png')}
          />
          <Image 
            source={require('./assets/puzzle-images/JohnTopLeft.png')}
            style={[{zIndex:1}, {position: 'absolute'},{top: 400},{left:200}]}
          />
          <Image 
            source={require('./assets/puzzle-images/JohnTopCenter.png')}
            style={[{zIndex:1}, {position: 'absolute'},{top: 350},{left:200}]}
          />
          </View>
        )}
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  puzzlePiece: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 100,
    left: 185,
  },

});
