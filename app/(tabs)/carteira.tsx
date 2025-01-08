import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Carteira = () => {
  const [isModalVisible, setIsModalVisible] = useState('');
  const [balance, setBalance] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storedBalance = await SecureStore.getItemAsync('balance');
      const storedBonus = await SecureStore.getItemAsync('bonus');
      setBalance(parseFloat(storedBalance) || 0);
      setBonus(parseFloat(storedBonus) || 0);
    };
    fetchData();
  }, []);

  const openModal = (modalType) => {
    setIsModalVisible(modalType);
  };

  const closeModal = () => {
    setIsModalVisible('');
  };

  const handlePayment = async () => {
    const storedBalance = parseFloat(await SecureStore.getItemAsync('balance')) || 0;
    if (storedBalance >= parseFloat(amount)) {
      await SecureStore.setItemAsync('balance', (storedBalance - parseFloat(amount)).toString());
      Alert.alert('Success', 'Payment Successful');
      setBalance(storedBalance - parseFloat(amount));
    } else {
      Alert.alert('Error', 'Insufficient Funds');
    }
    closeModal();
  };

  const handleReload = async () => {
    const storedBalance = parseFloat(await SecureStore.getItemAsync('balance')) || 0;
    await SecureStore.setItemAsync('balance', (storedBalance + parseFloat(amount)).toString());
    Alert.alert('Success', 'Balance Reloaded');
    setBalance(storedBalance + parseFloat(amount));
    closeModal();
  };

  const handleTransfer = async () => {
    const storedBalance = parseFloat(await SecureStore.getItemAsync('balance')) || 0;
    if (storedBalance >= parseFloat(amount)) {
      await SecureStore.setItemAsync('balance', (storedBalance - parseFloat(amount)).toString());
      Alert.alert('Success', `Transferred ${amount} Kz to ${recipient}`);
      setBalance(storedBalance - parseFloat(amount));
    } else {
      Alert.alert('Error', 'Insufficient Funds');
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Balance: {balance} Kz</Text>
      <Text style={styles.text}>Bonus: {bonus} Kz</Text>
      <Button title="Pay" onPress={() => openModal('payment')} />
      <Button title="Reload" onPress={() => openModal('reload')} />
      <Button title="Transfer" onPress={() => openModal('transfer')} />
      <Button title="Check Bonus" onPress={() => Alert.alert('Bonus', `You have ${bonus} Kz bonus`)} />

      <Modal visible={isModalVisible === 'payment'} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount to pay"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Button title="Pay" onPress={handlePayment} />
          <Button title="Cancel" onPress={closeModal} />
        </View>
      </Modal>

      <Modal visible={isModalVisible === 'reload'} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount to reload"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Button title="Reload" onPress={handleReload} />
          <Button title="Cancel" onPress={closeModal} />
        </View>
      </Modal>

      <Modal visible={isModalVisible === 'transfer'} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter recipient"
            value={recipient}
            onChangeText={setRecipient}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter amount to transfer"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Button title="Transfer" onPress={handleTransfer} />
          <Button title="Cancel" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '80%',
    color: 'white',
    backgroundColor: 'black',
    paddingHorizontal: 10,
  },
});

export default Carteira;
