import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';

const CustomModal = ({ open, onClose, children }) => {
  return (
    <View  style={styles.centeredView}>
      <PaperProvider>

      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        onRequestClose={onClose}
        focusable={true}
        style={styles.modalView}
        
      >
          <View style={styles.modalView} >{children}</View>
      </Modal>
      </PaperProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    zIndex: 10
  },
  modalView: {
    // padding: 10
  },
});

export default CustomModal;