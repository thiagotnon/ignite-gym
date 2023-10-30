import { Heading, Text, VStack, Icon } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";
import { LogOut } from "lucide-react-native";
import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

export const HomeHeader = () => {
  const { user, signOut } = useAuth();
  return (
    <HStack bg="$secondary900" pt="$12" pb="$4" px="$5" alignItems="center">
      <UserPhoto
        size={60}
        source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
        alt="imagem do usuário"
      />
      <VStack ml="$2" flex={1}>
        <Text color="$secondary100" fontSize="$md">
          Olá,
        </Text>
        <Heading
          color="$secondary100"
          fontSize="$md"
          fontWeight="$black"
          fontFamily="$heading"
        >
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={LogOut} size="xl" color="$secondary500" />
      </TouchableOpacity>
    </HStack>
  );
};
