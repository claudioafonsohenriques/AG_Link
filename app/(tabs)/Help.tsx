import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Help() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Ajuda</Text>
        <Text style={styles.text}>
          Precisa de ajuda? Estamos aqui para ajudar! Veja abaixo algumas perguntas frequentes:
        </Text>
        <Text style={styles.question}>1. Como faço para alterar minhas informações de perfil?</Text>
        <Text style={styles.answer}>
          Para alterar suas informações de perfil, vá até a página de perfil e clique no botão "Editar Perfil".
        </Text>
        <Text style={styles.question}>2. Como posso redefinir minha senha?</Text>
        <Text style={styles.answer}>
          Vá até a página de login e clique em "Esqueceu sua senha?" para iniciar o processo de redefinição de senha.
        </Text>
        <Text style={styles.question}>3. Como posso entrar em contato com o suporte?</Text>
        <Text style={styles.answer}>
          Você pode nos contatar através do email suporte@seuapp.com ou pelo nosso formulário de contato na página de suporte.
        </Text>
        {/* Adicione mais perguntas e respostas conforme necessário */}
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
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  answer: {
    fontSize: 16,
    marginBottom: 10,
  },
});
