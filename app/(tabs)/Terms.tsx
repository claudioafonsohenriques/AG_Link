import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Terms() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Termos e Condições de Uso</Text>

        {/* Seção 1: Introdução */}
        <Text style={styles.heading}>1. Introdução</Text>
        <Text style={styles.text}>
          Bem-vindo ao nosso aplicativo de transporte e logística. Ao utilizar nossos serviços, você concorda com os
          termos e condições descritos abaixo. Recomendamos que leia atentamente este documento antes de utilizar o aplicativo.
        </Text>

        {/* Seção 2: Definições */}
        <Text style={styles.heading}>2. Definições</Text>
        <Text style={styles.text}>
          “Usuário” refere-se à pessoa que utiliza o aplicativo para contratar serviços de transporte e logística.
          “Transportador” refere-se ao prestador de serviços de transporte de carga.
          “Aplicativo” refere-se à plataforma digital disponibilizada pela nossa empresa para a contratação de serviços.
        </Text>

        {/* Seção 3: Uso do Aplicativo */}
        <Text style={styles.heading}>3. Uso do Aplicativo</Text>
        <Text style={styles.text}>
          O uso do aplicativo é restrito a maiores de 18 anos. Ao se cadastrar, você declara que todas as informações fornecidas
          são verdadeiras e precisas. O usuário é responsável por manter a confidencialidade de suas credenciais de login.
        </Text>

        {/* Seção 4: Responsabilidades */}
        <Text style={styles.heading}>4. Responsabilidades</Text>
        <Text style={styles.text}>
          A plataforma atua como intermediária entre o transportador e o usuário. Não nos responsabilizamos por danos, perdas ou
          incidentes ocorridos durante o transporte de carga. O transportador é responsável por garantir a entrega segura da carga.
        </Text>

        {/* Seção 5: Preços e Pagamentos */}
        <Text style={styles.heading}>5. Preços e Pagamentos</Text>
        <Text style={styles.text}>
          Os preços dos serviços de transporte são estipulados pela plataforma com base na rota, tipo de carga e outros fatores.
          O pagamento deve ser feito por meio dos métodos disponibilizados no aplicativo e será retido até a conclusão do serviço.
        </Text>

        {/* Seção 6: Cancelamentos */}
        <Text style={styles.heading}>6. Cancelamentos e Reembolsos</Text>
        <Text style={styles.text}>
          O usuário pode cancelar o serviço de transporte antes do início da execução. Em caso de cancelamento após o transporte
          ter começado, poderá haver taxas associadas. Reembolsos são avaliados caso a caso, conforme nossa política de cancelamento.
        </Text>

        {/* Seção 7: Privacidade */}
        <Text style={styles.heading}>7. Privacidade e Segurança</Text>
        <Text style={styles.text}>
          O aplicativo coleta e utiliza dados pessoais de acordo com nossa política de privacidade. A segurança dos dados é uma prioridade,
          e implementamos medidas rigorosas para proteger as informações dos usuários.
        </Text>

        {/* Seção 8: Alterações nos Termos */}
        <Text style={styles.heading}>8. Alterações nos Termos</Text>
        <Text style={styles.text}>
          Podemos alterar estes Termos e Condições a qualquer momento. Notificaremos os usuários sobre quaisquer alterações, e o
          uso contínuo do aplicativo após tais alterações constitui sua aceitação dos novos termos.
        </Text>

        {/* Seção 9: Lei Aplicável */}
        <Text style={styles.heading}>9. Lei Aplicável e Jurisdição</Text>
        <Text style={styles.text}>
          Estes termos são regidos pelas leis vigentes no país onde o serviço é prestado. Qualquer disputa será resolvida nos tribunais
          competentes da jurisdição aplicável.
        </Text>

        {/* Seção 10: Contato */}
        <Text style={styles.heading}>10. Contato</Text>
        <Text style={styles.text}>
          Caso tenha dúvidas sobre estes termos, entre em contato conosco através do email suporte@transporteapp.com.
        </Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
});
