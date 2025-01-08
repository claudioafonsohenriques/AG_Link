import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Button, Text, Provider as PaperProvider, Appbar, Avatar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const route = useRoute();
  const { conversation } = route.params;
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá!', sender: 'user' },
    { id: 2, text: 'Oi, tudo bem?', sender: 'bot' },
    { id: 3, text: 'Sim, e você?', sender: 'user' },
    { id: 4, text: 'Estou bem, obrigado!', sender: 'bot' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation();

  const handleSend = () => {
    if (newMessage.trim() === '') {
      return;
    }
    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleBack = () => {
    navigation.navigate('ConversationListScreen');
  };

  const navigateToNegotiation = () => {
    navigation.navigate('negociacao');
  };

  const navigateToInformation = () => {
    navigation.navigate('Detalhes');
  };

  const navigateToSettings = () => {
    navigation.navigate('Configuracoes');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction onPress={handleBack} color="white" />
          <Avatar.Text size={36} label={conversation.name.charAt(0)} style={conversation.online ? styles.onlineAvatar : null} />
          {conversation.online && <View style={styles.onlineIndicator} />}
          <Appbar.Content title={conversation.name} titleStyle={{ color: 'white' }} />
          <Appbar.Action icon="handshake" onPress={navigateToNegotiation} color="white" />
          <Appbar.Action icon="information" onPress={navigateToInformation} color="white" />
          <Appbar.Action icon="cog" onPress={navigateToSettings} color="white" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[styles.message, { alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start' }]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Digite sua mensagem..."
            multiline
            placeholderTextColor="#aaa"
          />
          <Button mode="contained" onPress={handleSend} style={styles.sendButton}>
            Enviar
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  appbarHeader: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineAvatar: {
    borderWidth: 2,
    borderColor: 'green',
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    position: 'absolute',
    right: 70,
    top: 10,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 70,
  },
  message: {
    maxWidth: '80%',
    padding: 12,
    marginVertical: 6,
    borderRadius: 15,
    backgroundColor: '#e1f5fe',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 20,
  },
});

export default ChatScreen;