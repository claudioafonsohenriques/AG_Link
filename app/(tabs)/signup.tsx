import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import logo11 from './logo11.png'; // Substitua pelo caminho correto do seu logo
import { launchImageLibrary } from 'react-native-image-picker'; // Importe o ImagePicker
import axios from 'axios';

const SADC_COUNTRIES = [
  'AO', // Angola
  'CD', // República Democrática do Congo
  'NA', // Namíbia
  'ZA', // África do Sul
  'ZM', // Zâmbia
  'CG', // Congo-Brazzaville
];

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  //const [nif, setNif] = useState('');
   const [acceptedTerms, setAcceptedTerms] = useState(false);

  // FUNÇÃO PARA CADASTRAR OS MOTORISTAS:
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    if (!acceptedTerms) {
      alert("Você deve aceitar os termos e condições");
      return;
    }

    const userData = { email, name, phone, password };

    try {
      const response = await axios.post('http://192.168.1.140:5000/api/users/', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Usuário registrado com sucesso!');
        navigation.navigate('HomeScreen');
      } else {
        alert(response.data.message || 'Erro ao registrar usuário.');
      }
    } catch (error) {
      console.error('Erro de conexão:', error.response || error.message); // Log de erros
      alert('Erro ao conectar-se ao servidor. Tente novamente.');
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={logo11} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Crie a sua conta</Text>

        {/* Campos obrigatórios */}
        <TextInputField icon="envelope" value={email} setValue={setEmail} placeholder="Email" />
        <TextInputField icon="user" value={name} setValue={setName} placeholder="Nome" />
       {/*<TextInputField icon="id-card" value={nif} setValue={setNif} placeholder="NIF" />*/} 
        <TextInputField icon="phone" value={phone} setValue={setPhone} placeholder="Número de telefone" keyboardType="phone-pad" />
        <TextInputField icon="lock" value={password} setValue={setPassword} placeholder="Senha" secureTextEntry />
        <TextInputField icon="lock" value={confirmPassword} setValue={setConfirmPassword} placeholder="Confirmar Senha" secureTextEntry />

        <View style={styles.checkboxContainer}>
          <Checkbox status={acceptedTerms ? 'checked' : 'unchecked'} onPress={() => setAcceptedTerms(!acceptedTerms)} />
          <Text style={styles.checkboxLabel}>
            Eu concordo com os <Text style={styles.link} onPress={() => navigation.navigate('Terms')}>Termos de Serviço</Text> e <Text style={styles.link} onPress={() => navigation.navigate('PrivacyPolicy')}>Política de Privacidade</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Já tem uma conta? <Text style={styles.signupLink} onPress={() => navigation.navigate('login')}>Entrar</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

const TextInputField = ({ icon, value, setValue, placeholder, secureTextEntry, keyboardType }) => (
  <View style={styles.inputContainer}>
    <FontAwesome5 name={icon} size={20} color="#32CD32" style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#A9A9A9"
      value={value}
      onChangeText={setValue}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#32CD32',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#32CD32',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#696969',
  },
  link: {
    color: '#32CD32',
    textDecorationLine: 'underline',
  },
  signupText: {
    marginTop: 20,
    color: '#696969',
  },
  signupLink: {
    color: '#32CD32',
    fontWeight: 'bold',
  },
});

export default Signup;
