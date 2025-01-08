import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Text, Appbar, Provider as PaperProvider, Modal, Portal, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
 
const NotificationScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const notifications = [
    { id: 1, title: 'Novo pedido recebido', description: 'Você recebeu um novo pedido.', icon: 'bell' },
    { id: 2, title: 'Atualização de entrega', description: 'Seu pedido foi enviado e está a caminho.', icon: 'truck' },
    { id: 3, title: 'Promoção especial', description: 'Não perca nossas ofertas exclusivas!', icon: 'gift' },
    { id: 4, title: 'Atualização do perfil', description: 'Atualize suas informações de perfil.', icon: 'account' },
    { id: 1, title: 'Novo pedido recebido', description: 'Você recebeu um novo pedido.', icon: 'bell' },
    { id: 2, title: 'Atualização de entrega', description: 'Seu pedido foi enviado e está a caminho.', icon: 'truck' },
    { id: 3, title: 'Promoção especial', description: 'Não perca nossas ofertas exclusivas!', icon: 'gift' },
    { id: 4, title: 'Atualização do perfil', description: 'Atualize suas informações de perfil.', icon: 'account' },
    { id: 1, title: 'Novo pedido recebido', description: 'Você recebeu um novo pedido.', icon: 'bell' },
    { id: 2, title: 'Atualização de entrega', description: 'Seu pedido foi enviado e está a caminho.', icon: 'truck' },
    { id: 3, title: 'Promoção especial', description: 'Não perca nossas ofertas exclusivas!', icon: 'gift' },
    { id: 4, title: 'Atualização do perfil', description: 'Atualize suas informações de perfil.', icon: 'account' },
    { id: 1, title: 'Novo pedido recebido', description: 'Você recebeu um novo pedido.', icon: 'bell' },
    { id: 2, title: 'Atualização de entrega', description: 'Seu pedido foi enviado e está a caminho.', icon: 'truck' },
    { id: 3, title: 'Promoção especial', description: 'Não perca nossas ofertas exclusivas!', icon: 'gift' },
    { id: 4, title: 'Atualização do perfil', description: 'Atualize suas informações de perfil.', icon: 'account' },
  ];

  const handleBack = () => {
    navigation.navigate('HomeScreen');
    };

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedNotification(null);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction onPress={handleBack} color="black" />
          <Appbar.Content title={<Text style={styles.appbarTitle}>Notificações</Text>} titleStyle={{ color: 'white' }} />
          <Appbar.Action icon="cog" onPress={() => {}} color="black" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.content}>
          {notifications.map((item) => (
            <List.Item
              key={item.id}
              title={item.title}
              description={item.description}
              left={(props) => <List.Icon {...props} icon={item.icon} />}
              style={styles.notificationItem}
              onPress={() => openModal(item)}
            />
          ))}
          {notifications.length === 0 && (
            <Text style={styles.emptyText}>Não há notificações no momento.</Text>
          )}
         </ScrollView>
        <Portal>
          <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={styles.modalContainer}>
            {selectedNotification && (
              <View>
                <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
                <Text style={styles.modalDescription}>{selectedNotification.description}</Text>
                <Button mode="contained" onPress={closeModal} style={styles.modalButton}>Fechar</Button>
              </View>
            )}
          </Modal>
        </Portal>
        <FAB
          style={styles.fab}
          icon="map-marker"
          color="white"
          onPress={() => navigation.navigate('mapa')}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbarHeader: {
    backgroundColor: '#ffffff',
  },
  appbarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  notificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666666',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    alignSelf: 'center',
    backgroundColor:'black'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
});

export default NotificationScreen;