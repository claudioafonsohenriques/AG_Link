import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Tabs } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const BackIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
    <FontAwesome size={24} name="arrow-left" color="#FFFFFF" />
  </TouchableOpacity>
);

export default function App() {
  return (
    <NativeBaseProvider>
      <TabLayout />
    </NativeBaseProvider>
  );
}

function TabLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#A9A9A9',
        tabBarActiveBackgroundColor:'#dddddd',
        tabBarInactiveTintColor: '#A9A9A9',
        tabBarStyle: { backgroundColor: '#ffff', elevation: 8 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          href: null,
          tabBarStyle: { display: 'none' },
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Terms"
        options={{
          title: 'Termos e Políticas',
          headerShown: false,
          href: null,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="file-text" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Privacy"
        options={{
          title: 'Privacidade',
          href: null,
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="lock" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Help"
        options={{
          title: 'Ajuda',
          headerShown: false,
          href: null,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="help" color={color} />,
        }}
      />

      <Tabs.Screen
        name="SplashScreen"
        options={{
          headerShown: false,
          href: null,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="tachometer" color={color} />,
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          href: null,
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Navbar oculta
        }}
      />

      <Tabs.Screen
        name="signup"
        options={{
          title: 'Signup',
          href: null,
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Navbar oculta
        }}
      />
      <Tabs.Screen
        name="Onboarding"
        options={{
          title: 'onboarding',
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'inicio',
          headerShown: false,
          headerStyle: { backgroundColor: '#32CD32' },
          headerTintColor: '#FFFFFF',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
    <Tabs.Screen
        name="mapa"
        options={{
          title: ' ',
          headerShown: false,          
          href: null,
          tabBarStyle: { display: 'none' },
          headerStyle: { backgroundColor: '#32CD32' },
          headerTintColor: '#FFFFFF',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map-marker" color={color} />,
        }}
      />
<Tabs.Screen
      name="SearchScreen"
      options={{
          title: 'Conversas',
          href: null,
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Oculta a TabBar
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
      }}
  />
            <Tabs.Screen
            name="chat"
            options={{
              title: 'conversas',
              href:null,
              headerShown: false,
              tabBarStyle: { display: 'none' }, // Oculta a TabBar
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
            }}
          />
      
<Tabs.Screen
        name="Notificacao"
        options={{
          title: 'Notificações',
          href:null,
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Oculta a TabBar
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
        }}
      />
      
      <Tabs.Screen
      name="DetailsScreen"
      options={{
        title: 'detalhes',
        href:null,
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
      }}
    /> <Tabs.Screen
    name="detailScreen"
    options={{
      title: 'detalhes',
      href:null,
      headerShown: false,
      tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
    }}
  />
    
       <Tabs.Screen
        name="HistoricoAtividade"
        options={{
          title: 'Actividades',
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Oculta a TabBar
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
        }}
      />
     <Tabs.Screen
        name="Solucoes"
         options={{
          title: 'Soluções',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="briefcase" color={color} />,
        }}
      />  

<Tabs.Screen
        name="ConversationListScreen"
        options={{
          title: 'conversas',
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Oculta a TabBar
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="send" color={color} />,
        }}
      />

<Tabs.Screen
        name="DocumentUploadScreen"
        options={{
          title: 'doc',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
        <Tabs.Screen
        name="Perfil"
        options={{
          title: 'eu',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />

        <Tabs.Screen
        name="VerifyCodeScreen"
        options={{
          title: ' ',
          href: null,
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
   <Tabs.Screen
        name="carteira"
        options={{
          title: ' ',
          href: null,
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />

    </Tabs>
  );
}
