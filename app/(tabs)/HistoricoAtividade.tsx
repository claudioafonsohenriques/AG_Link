import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationAction } from '@react-navigation/native';

const activities = [
  {
    id: '1',
    type: 'Carga em progresso',
    description: 'Login realizado com sucesso',
    date: '2024-09-08 10:00',
    status: 'Concluído',
    user: 'João Silva',
    priority: 'Baixa',
    location: 'Luanda, Angola',
    referenceId: 'ABC123',
    notes: 'Nenhuma'
  },
  {
    id: '2',
    type: 'Carga finalizada',
    description: 'Compra realizada: Cesta de Ingredientes 🚚',
    date: '2024-09-07 15:45',
    status: 'Concluído',
    user: 'Maria Gomes',
    priority: 'Média',
    location: 'Luanda, Angola',
    referenceId: 'XYZ789',
    notes: 'Cesta enviada para entrega'
  },
  {
    id: '3',
    type: 'Mensagem',
    description: 'Nova mensagem recebida de Suporte',
    date: '2024-09-06 09:30',
    status: 'Pendente',
    user: 'Carlos Costa',
    priority: 'Alta',
    location: 'Luanda, Angola',
    referenceId: 'MSG001',
    notes: 'Aguardando resposta'
  },
  {
    id: '4',
    type: 'Cargas rejeitadas',
    description: 'Login realizado com sucesso',
    date: '2024-09-08 10:00',
    status: 'Rejeitado',
    user: 'Ana Souza',
    priority: 'Baixa',
    location: 'Luanda, Angola',
    referenceId: 'DEF456',
    notes: 'Erro no sistema'
  },
  {
    id: '5',
    type: 'Carga anuladas',
    description: 'Compra realizada: Cesta de Ingredientes 🚚',
    date: '2024-09-07 15:45',
    status: 'Cancelado',
    user: 'Paulo Rocha',
    priority: 'Média',
    location: 'Luanda, Angola',
    referenceId: 'GHI987',
    notes: 'Problema com o pagamento'
  },
  {
    id: '6',
    type: 'Mensagem',
    description: 'Nova mensagem recebida de Suporte',
    date: '2024-09-06 09:30',
    status: 'Pendente',
    user: 'Mariana Lima',
    priority: 'Alta',
    location: 'Luanda, Angola',
    referenceId: 'MSG002',
    notes: 'Aguardando esclarecimento sobre o problema'
  },
];

export default function HistoricoAtividade({ navigation }) {
  const handleBack = () => {
    navigation.navigate('HomeScreen');
  };

  const renderItem = ({ item }) => (
    <View style={styles.activityCard}>
      <Icon name={getActivityIcon(item.type)} size={24} color="green" style={styles.cardIcon} />
      <View style={styles.activityDetails}>
        <Text style={styles.activityType}>{item.type}</Text>
        <Text style={styles.activityDescription}>{item.user}</Text>
        <Text style={styles.activityDescription}>{item.priority}</Text>
        <Text style={styles.activityDescription}>{item.description}</Text>
        <Text style={styles.activityDescription}>{item.status}</Text>
        <Text style={styles.activityDate}>{item.date}</Text>
      </View>
    </View>
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case 'Login':
        return 'login';
      case 'Compra':
        return 'shopping-cart';
      case 'Mensagem':
        return 'message';
      case 'Carga em progresso':
        return 'hourglass-empty';
      case 'Carga finalizada':
        return 'check-circle-outline';
        case 'Cargas rejeitadas':
        return 'cancel';
        case 'Carga anuladas':
        return 'delete-forever';
      default:
        return 'info';
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={handleBack} color="black" />
        <Appbar.Content title={<Text style={styles.appbarTitle}>Histórico de Atividades</Text>} titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appbarHeader: {
    backgroundColor: 'white',
  },
  appbarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  activityCard: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 15,
  },
  activityDetails: {
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  activityDate: {
    fontSize: 12,
    color: '#aaaaaa',
  },
});
