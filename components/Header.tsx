import React from 'react';
import { Box, HStack, Text, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ title }) => {
  return (
    <Box bg="primary.500" p="4" safeAreaTop>
      <HStack justifyContent="space-between" alignItems="center">
        <IconButton
          icon={<MaterialIcons name="menu" size={24} color="white" />}
          _pressed={{ bg: "primary.600" }}
        />
        <Text color="white" fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <IconButton
          icon={<MaterialIcons name="notifications" size={24} color="white" />}
          _pressed={{ bg: "primary.600" }}
        />
      </HStack>
    </Box>
  );
};

export default Header;
