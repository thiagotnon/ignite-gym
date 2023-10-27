import { Heading, Text, VStack, Icon } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";
import { LogOut } from "lucide-react-native";

export const HomeHeader = () => {
  return (
    <HStack bg="$secondary900" pt="$12" pb="$4" px="$5" alignItems="center">
      <UserPhoto
        size={60}
        source={{
          uri: "https://github.com/thiagotnon.png",
        }}
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
          Thiago
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={LogOut} size="xl" color="$secondary500" />
      </TouchableOpacity>
    </HStack>
  );
};
