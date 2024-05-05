import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

const CustomModal = ({ open, onClose, children }) => {
  return (
    <View  style={styles.centeredView}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },
  modalView: {
    // padding: 10
  },
});

export default CustomModal;