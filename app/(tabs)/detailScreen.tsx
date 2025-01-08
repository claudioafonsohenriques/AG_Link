import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Appbar, Card } from 'react-native-paper';

const DetailScreen = ({ route, navigation }) => {
  const { profile } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={profile.nome} titleStyle={styles.appbarTitle} />
      </Appbar.Header>
      
      <Image source={profile.image} style={styles.profileImage} />
      
      <View style={styles.detailContainer}>
        <Card style={styles.detailCard}>
          <Card.Content>
            <Text style={styles.detailTitle}>Tipo:</Text>
            <Text style={styles.detailText}>{profile.type}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.detailCard}>
          <Card.Content>
            <Text style={styles.detailTitle}>Localização:</Text>
            <Text style={styles.detailText}>[Inserir Localização]</Text>
          </Card.Content>
        </Card>

        <Card style={styles.detailCard}>
          <Card.Content>
            <Text style={styles.detailTitle}>Produtos:</Text>
            <Text style={styles.detailText}>[Inserir Lista de Produtos]</Text>
          </Card.Content>
        </Card>

        <Card style={styles.detailCard}>
          <Card.Content>
            <Text style={styles.detailTitle}>Promoções:</Text>
            <Text style={styles.detailText}>[Inserir Promoções Disponíveis]</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appbar: {
    backgroundColor: '#4CAF50',
  },
  appbarTitle: {
    color: '#fff',
  },
  profileImage: {
    width: '100%',
    height: 200,
  },
  detailContainer: {
    padding: 16,
  },
  detailCard: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DetailScreen;
