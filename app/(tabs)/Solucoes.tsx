import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { NativeBaseProvider, Box, Icon } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Appbar, Modal, Portal, Button, Provider as PaperProvider } from 'react-native-paper';

export default function Solucoes() {
  const [visible, setVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      name: 'Cargas Angola RDC',
      description: 'Transporte de cargas entre Angola e RDC com segurança e eficiência.',
      icon: 'truck'
    },
    {
      id: 2,
      name: 'Carregamentos Interprovinciais',
      description: 'Serviços de carregamento para transporte entre províncias.',
      icon: 'map'
    },
    {
      id: 3,
      name: 'Carregamento Intraprovincial',
      description: 'Transporte de cargas dentro da mesma província.',
      icon: 'location-arrow'
    },
    {
      id: 4,
      name: 'Cargas Pequenas e Médias',
      description: 'Transporte de cargas pequenas e médias para diversos destinos.',
      icon: 'boxes'
    },
    {
      id: 5,
      name: 'Carregamentos Grandes',
      description: 'Transporte de grandes volumes de carga com veículos adequados.',
      icon: 'warehouse'
    },
    {
      id: 6,
      name: 'Versão Premium',
      description: 'Serviço premium com benefícios exclusivos e prioridade no atendimento.',
      icon: 'star'
    },
    // Adicione outros serviços possíveis aqui
    {
      id: 7,
      name: 'Serviço de Mudança',
      description: 'Serviço completo para mudanças residenciais e comerciais.',
      icon: 'home'
    },
    {
      id: 8,
      name: 'Logística Reversa',
      description: 'Gerenciamento eficiente de devoluções e logística reversa.',
      icon: 'recycle'
    },
    {
      id: 9,
      name: 'Transporte Especializado',
      description: 'Transporte de cargas que requerem cuidados especiais e manuseio.',
      icon: 'certificate'
    },
    {
      id: 10,
      name: 'Serviço de Armazenagem',
      description: 'Armazenagem segura e eficiente para diversos tipos de carga.',
      icon: 'archive'
    }
  ];

  const showModal = (service) => {
    setSelectedService(service);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedService(null);
  };

  return (
    <PaperProvider>
      <NativeBaseProvider>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.Content
            title={<Text style={styles.appbarTitle}>Nossas Soluções</Text>}
            titleStyle={styles.appbarTitle}
          />
          <Appbar.Action icon="cog" onPress={() => {}} color="black" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.container}>
          {services.map((service) => (
            <Box
              key={service.id}
              style={styles.serviceCard}
              onTouchEnd={() => showModal(service)}
            >
              <Icon
                as={FontAwesome}
                name={service.icon}
                size={10}
                color="red"
                style={styles.icon}
              />
              <View style={styles.serviceContent}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
            </Box>
          ))}
        </ScrollView>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
            {selectedService && (
              <>
                <Text style={styles.modalTitle}>{selectedService.name}</Text>
                <Text style={styles.modalDescription}>{selectedService.description}</Text>
                <Button
                  mode="text"
                  onPress={() => Linking.openURL(selectedService.link)}
                  style={styles.modalLink}
                  labelStyle={styles.linkLabel}
                >
                  Saiba mais
                </Button>
              </>
            )}
          </Modal>
        </Portal>
      </NativeBaseProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  appbarHeader: {
    backgroundColor: '#ffffff',
  },
  appbarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  icon: {
    marginRight: 15,
  },
  serviceContent: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  modalLink: {
    marginTop: 10,
  },
  linkLabel: {
    color: 'green',
    fontWeight: 'bold',
  },
});
