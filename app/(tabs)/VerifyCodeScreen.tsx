import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const VerifyCodeScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(Array(5).fill(''));
  const [timer, setTimer] = useState(45);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendEnabled(true);
    }
  }, [timer]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      // Move focus to the next input
      document.getElementById(`code-input-${index + 1}`)?.focus();
    } else if (!text && index > 0) {
      // Move focus to the previous input
      document.getElementById(`code-input-${index - 1}`)?.focus();
    }
  };

  const handleVerifyCode = () => {
    const fullCode = code.join('');
    if (fullCode.length !== 5) {
      Alert.alert('Erro', 'O código deve ter exatamente 6 dígitos.');
      return;
    }

    if (fullCode === '123456') {
      Alert.alert('Sucesso', 'Código verificado com sucesso!');
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Erro', 'Código inválido.');
    }
  };

  const handleResendCode = () => {
    setTimer(60);
    setIsResendEnabled(false);
  };

  const handleAlternativeVerification = () => {
    navigation.navigate('AlternativeVerificationScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.logo} />
      <Text style={styles.title}>Verifique seu Código</Text>
      <Text style={styles.description}>
        Digite o código de 5 dígitos enviado para o seu WhatsApp ou e-mail.
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            id={`code-input-${index}`}
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#2f4f4f"
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleCodeChange(text, index)}
            accessibilityLabel={`Campo de código ${index + 1}`}
            accessibilityHint="Digite um dígito do código de verificação"
          />
        ))}
      </View>
      <Text style={styles.timer}>
        {isResendEnabled ? 'Você pode reenviar o código.' : `Reenviar em ${timer}s`}
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.verifyButton]}
        onPress={handleVerifyCode}
        accessibilityLabel="Botão de verificação"
      >
        <Icon name="check-circle" size={20} color="#fff" />
        <Text style={styles.buttonText}>Verificar Código</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.resendButton]}
        onPress={handleResendCode}
        disabled={!isResendEnabled}
        accessibilityLabel="Botão de reenvio do código"
      >
        <Icon name="refresh" size={20} color="#fff" />
        <Text style={styles.buttonText}>Reenviar Código</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.alternativeButton}
        onPress={handleAlternativeVerification}
        accessibilityLabel="Botão de verificação alternativa"
      >
        <Text style={styles.alternativeText}>Confirmar Identidade de Outra Maneira</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffff',
  },
  logo: {
    width: 280,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#32CD32',
  },
  description: {
    fontSize: 16,
    color: '#2f4f4f',
    marginBottom: 24,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderColor: '#9acd32',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 22,
    color: '#2f4f4f',
  },
  timer: {
    fontSize: 16,
    color: '#2f4f4f',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  verifyButton: {
    backgroundColor: '#32CD32',
  },
  resendButton: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alternativeButton: {
    marginTop: 20,
  },
  alternativeText: {
    fontSize: 16,
    color: 'black',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default VerifyCodeScreen;
