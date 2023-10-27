import { TouchableOpacity } from "react-native";
import {
  Button,
  Center,
  Heading,
  ScrollView,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { useState } from "react";
import { Alert } from "react-native";

export const Profile = () => {
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/thiagotnon.png"
  );

  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );
        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 2) {
          return toast.show({
            placement: "bottom",
            render: ({ id }) => (
              <Toast
                nativeID={"toast-" + id}
                action="attention"
                variant="solid"
              >
                <VStack space="xs">
                  <ToastTitle>Imagem muito grande.</ToastTitle>
                  <ToastDescription> Escolha uma de até 3MB.</ToastDescription>
                </VStack>
              </Toast>
            ),
          });
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt="$5" px="$6">
          <UserPhoto
            size={130}
            source={{
              uri: userPhoto,
            }}
            alt="imagem do usuário"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$emerald500"
              fontWeight="$bold"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" />
          <Input value="thiagotnon@gmail.com" isDisabled />
        </Center>

        <VStack px="$6">
          <Heading
            color="$secondary200"
            fontSize="$md"
            mb="$2"
            fontFamily="$heading"
          >
            Alterar senha
          </Heading>

          <Input placeholder="Senha atual" secureTextEntry />
          <Input placeholder="Nova senha" secureTextEntry />
          <Input placeholder="Confirme a nova senha" secureTextEntry />
          <Button
            w="$full"
            bg="$emerald500"
            h={50}
            sx={{
              ":active": {
                bg: "$emerald600",
              },
            }}
          >
            <Text color="$emerald100" fontFamily="$heading" fontSize="$sm">
              Atualizar
            </Text>
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
