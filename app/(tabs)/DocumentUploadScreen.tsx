import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DocumentUploadScreen = () => {
    const [documents, setDocuments] = useState([]);

    const handleDocumentUpload = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            setDocuments((prevDocuments) => [...prevDocuments, result]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User canceled document picker');
            } else {
                console.error('Unknown error: ', err);
                Alert.alert("Erro", "Ocorreu um erro ao tentar carregar o documento.");
            }
        }
    };

    const renderDocument = (doc, index) => {
        const isImage = doc.type.startsWith('image/');
        return (
            <View key={index} style={styles.documentCard}>
                {isImage ? (
                    <Image
                        source={{ uri: doc.uri }}
                        style={styles.documentPreview}
                        resizeMode="contain"
                    />
                ) : (
                    <View style={styles.pdfPreview}>
                        <Icon name="picture-as-pdf" size={60} color="#FF0000" />
                    </View>
                )}
                <Text style={styles.documentName}>
                    {doc.name ? doc.name : `Documento ${index + 1}`}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Documentos do Motorista</Text>
            <ScrollView
                contentContainerStyle={styles.documentContainer}
                showsVerticalScrollIndicator={false}
            >
                {documents.length === 0 ? (
                    <Text style={styles.noDocumentsText}>Nenhum documento carregado</Text>
                ) : (
                    documents.map(renderDocument)
                )}
                <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentUpload}>
                    <Icon name="file-upload" size={40} color="#FFFFFF" />
                    <Text style={styles.uploadText}>Adicionar Documento</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    documentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    documentCard: {
        width: '48%',
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
        padding: 10,
    },
    documentPreview: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        backgroundColor: '#EAEAEA',
    },
    pdfPreview: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    documentName: {
        fontSize: 14,
        color: '#333',
        marginTop: 10,
        textAlign: 'center',
    },
    uploadButton: {
        width: '100%',
        backgroundColor: '#01B70D',
        borderRadius: 10,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    uploadText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
    },
    noDocumentsText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default DocumentUploadScreen;
