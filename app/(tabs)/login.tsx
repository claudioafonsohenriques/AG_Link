import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo11 from './logo11.png'; // Substitua pelo caminho correto do seu logo
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Importa ícones do FontAwesome5

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.140:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('VerifyCodeScreen'); // Nome da tela de verificação de código
      } else {
        Alert.alert('Erro', data.message || 'Email ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na conexão com o servidor');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={logo11} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Bom vê-lo novamente</Text>

        {/* Campo de Email */}
        <View style={styles.inputContainer}>
          <FontAwesome5 name="envelope" size={20} color="#32CD32" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email ou número de telefone"
            placeholderTextColor="#A9A9A9"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Campo de email"
            accessibilityHint="Digite seu endereço de email"
          />
        </View>

        {/* Campo de Senha */}
        <View style={styles.inputContainer}>
          <FontAwesome5 name="lock" size={20} color="#32CD32" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Campo de senha"
            accessibilityHint="Digite sua senha"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} accessibilityLabel="Botão de login">
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Não tem uma conta?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('signup')}>
            Cadastre-se
          </Text>
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 AgriLink - Carregaa. - Atomo Technologies</Text>
        <Text style={styles.footerText}>Todos os direitos reservados</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 150,
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#32CD32',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#32CD32', // Linha inferior verde
    marginBottom: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10, // Espaço entre o ícone e o campo de entrada
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#32CD32', // Verde lime
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#696969',
    fontSize: 14,
  },
  signupLink: {
    color: '#32CD32',
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#696969',
  },
});

export default Login;