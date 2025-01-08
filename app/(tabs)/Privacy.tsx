import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Privacy() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Política de Privacidade</Text>
        <Text style={styles.text}>
          Sua privacidade é importante para nós. Esta política descreve como coletamos, usamos e protegemos suas informações:
        </Text>
        <Text style={styles.text}>
          1. Coleta de Dados: Coletamos informações pessoais como nome, email, e número de telefone.
        </Text>
        <Text style={styles.text}>
          2. Uso de Dados: Utilizamos suas informações para personalizar sua experiência no aplicativo.
        </Text>
        <Text style={styles.text}>
          3. Compartilhamento de Dados: Não compartilhamos suas informações com terceiros sem seu consentimento.
        </Text>
        <Text style={styles.text}>
          4. Segurança: Implementamos medidas de segurança para proteger seus dados.
        </Text>
        {/* Adicione mais conteúdo conforme necessário */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
});
