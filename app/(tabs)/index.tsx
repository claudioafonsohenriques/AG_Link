// App.js ou index.js

import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import SplashScreen from './SplashScreen'; // Caminho para o seu componente SplashScreen
import HomeScreen from './HomeScreen'; // Importe a tela inicial

// Configure o tema personalizado
const theme = extendTheme({
  colors: {
    primary: '#32CD32', // Verde lime
    white: '#FFFFFF',   // Cor branca
    secondary: {
      500: '#FF5733',  // Exemplo de uma cor secundária, se necessário
    },
  },
  // Adicione outras configurações de tema, se precisar
  components: {
    Button: {
      baseStyle: {
        rounded: 'full',
      },
    },
  },
});

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <SplashScreen />
      </NativeBaseProvider>
  );
};

export default App;
