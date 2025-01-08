import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Provider as PaperProvider, Appbar, Avatar, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const conversations = [
  { id: '1', name: 'Lucas', lastMessage: 'Oi, tudo bem?', online: true, image: require('./logo.png') },
  { id: '2', name: 'Nara', lastMessage: 'Como está a colheita?', online: false, image: require('./logo.png') },
  { id: '3', name: 'Candama', lastMessage: 'Podemos negociar o preço?', online: true, image: require('./logo.png') },
  { id: '4', name: 'N.o.s Supermercado', lastMessage: 'Pedido confirmado!', online: false, image: require('./logo.png') },
  { id: '5', name: 'Nome da Empresa', lastMessage: 'Preciso de mais informações.', online: true, image: require('./logo.png') },
  { id: '6', name: 'Nome da Fábrica', lastMessage: 'Entrega agendada para amanhã.', online: false, image: require('./logo.png') },
];

const ConversationListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  const handleConversationPress = (conversation) => {
    navigation.navigate('chat', { conversation });
  };

  const handleBack = () => {
    navigation.navigate('HomeScreen');
};

  const handleInfo = () => {
    alert('Informações sobre o aplicativo');
  };

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.conversationItem} 
      onPress={() => handleConversationPress(item)}
      activeOpacity={0.7}
    >
      <Avatar.Image source={item.image} size={48} style={item.online ? styles.onlineAvatar : null} />
      <View style={styles.conversationDetails}>
        <Text style={styles.conversationName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
    </TouchableOpacity>
  );

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const filteredData = conversations.filter((conversation) =>
      conversation.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredConversations(filteredData);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction onPress={handleBack} color="#32CD32" />
          <Searchbar
            placeholder="Buscar..."
            onChangeText={handleSearchChange}
            value={searchQuery}
            style={styles.searchbar}
            inputStyle={styles.searchInput}
          />
          <Appbar.Action icon="information" onPress={handleInfo} color="#32CD32" />
        </Appbar.Header>
        <FlatList
          data={filteredConversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appbarHeader: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  searchbar: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#F2F2F2F2', // Mantenha o fundo branco para o Searchbar
  },
  searchInput: {
    color: 'black', // Cor do texto
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
  },
  conversationDetails: {
    marginLeft: 10,
    flex: 1,
  },
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  onlineAvatar: {
    borderWidth: 2,
    borderColor: '#32CD32',
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#32CD32',
  },
});

export default ConversationListScreen;
