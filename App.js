import { StyleSheet, Text, View, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(require('./assets/puzzle-images/mainView.png'));
  const [isButtonBEnabled, setIsButtonBEnabled] = useState(false);
  const [navigateToPluggedIn, setNavigateToPluggedIn] = useState(false); 
  const [numberSequence, setNumberSequence] = useState(['', '', '', '']);

  // Preload dougFace image
  const dougFaceImage = require('./assets/puzzle-images/dougFace.png');

  // Create refs for each TextInput
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handlePress = () => setModalVisible(true);

  const changeBackgroundImage = () => {
    if (navigateToPluggedIn) {
      setBackgroundImage(require('./assets/puzzle-images/pluggedIn.png'));
    } else {
      setBackgroundImage(require('./assets/puzzle-images/unplugged.png'));
    }
  };

  const resetBackgroundImage = () => {
    setBackgroundImage(require('./assets/puzzle-images/mainView.png'));
    if (!navigateToPluggedIn) setIsButtonBEnabled(false);
  };

  const enableButtonB = () => setIsButtonBEnabled(true);

  const changeToPluggedIn = () => {
    setBackgroundImage(require('./assets/puzzle-images/pluggedIn.png'));
    setNavigateToPluggedIn(true);
  };

  const handleNumberChange = (index, value) => {
    const newSequence = [...numberSequence];
    newSequence[index] = value;
    setNumberSequence(newSequence);

    // Auto-focus on next input or previous input for backspace
    if (value && index < 3) inputRefs[index + 1].current.focus();
    if (!value && index > 0) inputRefs[index - 1].current.focus();

    // Check the code once all inputs are filled
    if (newSequence.join('') === '6289') setBackgroundImage(dougFaceImage);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={backgroundImage} style={styles.container} resizeMode="stretch">
        {/* Main view interactive areas */}
        {backgroundImage === require('./assets/puzzle-images/mainView.png') && (
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.buttonArea} />
          </TouchableWithoutFeedback>
        )}

        {backgroundImage === require('./assets/puzzle-images/mainView.png') && (
          <TouchableWithoutFeedback onPress={changeBackgroundImage}>
            <View style={[styles.changeBackgroundButton, { opacity: 0 }]} />
          </TouchableWithoutFeedback>
        )}

        {/* Unplugged state buttons */}
        {backgroundImage === require('./assets/puzzle-images/unplugged.png') && (
          <>
            <TouchableOpacity style={styles.buttonA} onPress={enableButtonB}>
              <Text style={styles.buttonText}>Button A</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonB, { opacity: isButtonBEnabled ? 1 : 0.5 }]}
              onPress={isButtonBEnabled ? changeToPluggedIn : null}
              disabled={!isButtonBEnabled}
            >
              <Text style={styles.buttonText}>Button B</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Reset button */}
        {(backgroundImage === require('./assets/puzzle-images/unplugged.png') ||
          backgroundImage === require('./assets/puzzle-images/pluggedIn.png')) && (
          <TouchableOpacity style={styles.resetButton} onPress={resetBackgroundImage}>
            <Text style={styles.arrowText}>↓</Text>
          </TouchableOpacity>
        )}

        {/* Four-number input on pluggedIn screen */}
        {backgroundImage === require('./assets/puzzle-images/pluggedIn.png') && (
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Password:</Text>
            {numberSequence.map((value, index) => (
              <TextInput
                key={index}
                style={styles.textInput}
                value={value}
                onChangeText={(text) => handleNumberChange(index, text)}
                keyboardType="numeric"
                maxLength={1}
                placeholder="•"
                placeholderTextColor="yellow"
                ref={inputRefs[index]}
              />
            ))}
          </View>
        )}
      </ImageBackground>

      <Modal animationType="slide" transparent={false} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <ImageBackground source={require('./assets/puzzle-images/board.png')} style={styles.modalBackground} resizeMode="stretch">
          {/* Modal content */}
        </ImageBackground>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArea: {
    position: 'absolute',
    bottom: 270,
    left: 50,
    width: 150,
    height: 320,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 10,
  },
  changeBackgroundButton: {
    position: 'absolute',
    bottom: 450,
    left: 250,
    width: 143,
    height: 120,
    borderRadius: 10,
    opacity: 0,
  },
  resetButton: {
    position: 'absolute',
    bottom: 50,
    left: 200,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  arrowText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonA: {
    position: 'absolute',
    bottom: 280,
    left: 380,
    padding: 10,
    width: 10,
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    opacity: 0,
  },
  buttonB: {
    position: 'absolute',
    bottom: 323,
    left: 330,
    padding: 10,
    width: 30,
    height: 10,
    borderRadius: 10,
    opacity: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: -65,
    left: 16,
  },
  textInput: {
    width: 36,
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'yellow',
    textAlign: 'center',
    fontSize: 30,
    color: 'yellow',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  text: {
    position: 'absolute',
    left: 35,
    top: -40,
    color: 'yellow',
    fontSize: 30,
  },
});
