import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Perfil({ navigation }) {
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Moisés Lucamba',
    email: 'moises@example.com',
    phone: '+244 999 999 999',
    address: 'Luanda, Angola',
    userType: 'Motorista',
    description: 'Muitos anos de experiência.',
    cargoType: 'Grãos',  // Novo campo para tipo de carga
    nif: '123456789',    // Novo campo para NIF
    province: 'Luanda',  // Novo campo para província
    country: 'Angola',   // Novo campo para país
    comments: [  // Novo campo para comentários e avaliações
      { text: 'Ótimo serviço, muito pontual!', rating: 5 },
      { text: 'Muito bom, mas pode melhorar a comunicação.', rating: 4 },
      { text: 'Excelente! Super confiável!', rating: 5 },
      { text: 'O serviço é bom, mas o tempo de entrega pode ser melhorado.', rating: 4 },
      { text: 'Muito bom, preço justo e rápido.', rating: 5 },
    ],
  });

  const [isModalVisible, setIsModalVisible] = useState(false); // Controlar a visibilidade do modal
  const [imageToDisplay, setImageToDisplay] = useState(''); // Armazenar a URL da imagem clicada
  const [showAllComments, setShowAllComments] = useState(false); // Controlar se exibe todos os comentários ou apenas os primeiros 3

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
    // Lógica para salvar as informações
  };

  const handleImageClick = (imageUrl) => {
    setImageToDisplay(imageUrl);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setImageToDisplay('');
  };

  const handleShowMoreComments = () => {
    setShowAllComments(true);  // Exibe todos os comentários ao clicar em "Ver Mais"
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        {/* Foto de Perfil e Informações do Usuário */}
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={() => handleImageClick('https://via.placeholder.com/150')}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} // Foto de perfil
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            {editing ? (
              <TextInput
                style={styles.input}
                value={userInfo.name}
                onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
              />
            ) : (
              <Text style={styles.userName}>{userInfo.name}</Text>
            )}
            <Text style={styles.userType}>{userInfo.userType}</Text>
          </View>
        </View>

        {/* Descrição do Usuário */}
        <View style={styles.descriptionContainer}>
          {editing ? (
            <TextInput
              style={styles.input}
              value={userInfo.description}
              onChangeText={(text) => setUserInfo({ ...userInfo, description: text })}
            />
          ) : (
            <Text style={styles.description}>{userInfo.description}</Text>
          )}
          {editing ? (
            <TextInput
              style={styles.input}
              value={userInfo.address}
              onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
            />
          ) : (
            <Text style={styles.address}>{userInfo.address}</Text>
          )}
        </View>

         <View style={styles.infoRow}>
          <Text style={styles.infoText}>Tipo de Carga: {userInfo.cargoType}</Text>
          <Text style={styles.infoText}>NIF: {userInfo.nif}</Text>
          <Text style={styles.infoText}>Província: {userInfo.province}</Text>
          <Text style={styles.infoText}>País: {userInfo.country}</Text>
        </View>

         <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={editing ? handleSave : handleEditToggle}
          >
            <Text style={styles.buttonText}>{editing ? 'Salvar' : 'Editar Perfil'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { /* Lógica para "Mais Detalhes" */ }}
          >
            <Text style={styles.buttonText}>Mais Detalhes</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Comentários e Avaliações */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comentários e Avaliações</Text>
          {userInfo.comments.slice(0, showAllComments ? userInfo.comments.length : 3).map((comment, index) => (
            <View key={index} style={styles.commentCard}>
              <Text style={styles.commentText}>{comment.text}</Text>
              <Text style={styles.commentRating}>Estrelas: {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}</Text>
            </View>
          ))}

          {/* Botão para Ver Mais Comentários */}
          {!showAllComments && userInfo.comments.length > 3 && (
            <TouchableOpacity onPress={handleShowMoreComments} style={styles.showMoreButton}>
              <Text style={styles.showMoreText}>Ver Mais</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Seções e Links Rápidos */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Configurações e Informações</Text>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Definicoes')}>
            <Icon name="settings" size={24} color="green" style={styles.cardIcon} />
            <Text style={styles.cardText}>Definições</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('InformacoesLegais')}>
            <Icon name="info" size={24} color="green" style={styles.cardIcon} />
            <Text style={styles.cardText}>Informações Legais</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TermosPolíticas')}>
            <Icon name="description" size={24} color="green" style={styles.cardIcon} />
            <Text style={styles.cardText}>Termos e Políticas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DocumentUploadScreen')}>
            <Icon name="bar-chart" size={24} color="green" style={styles.cardIcon} />
            <Text style={styles.cardText}>Documentos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DocumentUploadScreen')}>
            <Icon name="bar-chart" size={24} color="green" style={styles.cardIcon} />
            <Text style={styles.cardText}>Contacto de suporte Carregaa</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <Image source={{ uri: imageToDisplay }} style={styles.modalImage} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userType: {
    fontSize: 16,
    color: '#777',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  address: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  input: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    width: '48%', // Ajuste para se alinhar em duas colunas
  },
  sectionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginBottom: 15,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  cardIcon: {
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  commentsSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  commentCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  commentText: {
    fontSize: 16,
    color: '#555',
  },
  commentRating: {
    fontSize: 14,
    color: '#888',
  },
  showMoreButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  showMoreText: {
    color: '#32CD32',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
