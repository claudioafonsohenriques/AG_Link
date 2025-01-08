import React, { useEffect } from 'react';
import { Box, Button, Center, Text, VStack, Image, Icon } from 'native-base';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter instalado o @expo/vector-icons

// Defina as cores diretamente
const primaryColor = '#32CD32'; // Verde lime
const whiteColor = '#F0F0F0';
const grayColor = '#F5F5F5'; // Cinza claro

// Escolha entre branco e cinza para o fundo
const backgroundColor = grayColor; // ou substitua por 'grayColor' para fundo cinza

// Importando o logo
import logo11 from './logo11.png'; // Certifique-se que o nome do arquivo e o caminho estão corretos

const SplashScreen = () => {
  const navigation = useNavigation();
  
  const fadeAnim = new Animated.Value(0); // Animação de fade-in
  const bounceAnim = new Animated.Value(0); // Animação de salto (posição vertical)

  // Função para criar o efeito de salto
  const startBounce = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: -90, // Salta para cima
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0, // Volta ao centro
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: -60, // Salta um pouco menos
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0, // Volta ao centro
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: -10, // Salto final pequeno
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0, // Volta ao centro
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Inicia a animação de fade-in e salto ao carregar
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000, // 3 segundos
      useNativeDriver: true,
    }).start();

    startBounce(); // Inicia a animação de salto
  }, []);

  return (
    <Center flex={1} bg={backgroundColor} p={5}>
      <VStack space={4} alignItems="center">
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: bounceAnim }] }}>
          <Image
            source={logo11}
            alt="Logo do App"
            size="xl" // Ajuste o tamanho do logo conforme necessário
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <Box>
            <Text bold color={primaryColor} fontSize="lg" textAlign="center">
              Nunca volte vazio com a Carregaa.
            </Text>
          </Box>
        </Animated.View>
      </VStack>

      <Animated.View style={{ opacity: fadeAnim, marginTop: 50 }}>
        <Button
          onPress={() => navigation.navigate('signup')}
          size="lg"
          bg={primaryColor}
          _text={{ color: whiteColor, fontWeight: 'bold' }}
          borderRadius="md" // Bordas mais arredondadas
          shadow={2} // Sombra um pouco mais forte para o botão
          _pressed={{ bg: '#228B22' }} // Cor do botão quando pressionado
          rightIcon={
            <Icon
              as={Ionicons}
              name="arrow-forward"
              size="lg"
              color={whiteColor}
            />
          }
        >
          Começar Agora
        </Button>
      </Animated.View>
    </Center>
  );
};

export default SplashScreen;
