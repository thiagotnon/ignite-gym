import { useState } from "react";
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
import * as yup from "yup";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";

type FormDataProps = {
  name: string;
  email?: string;
  password?: string | null | undefined;
  old_password?: string | null | undefined;
  confirm_password?: string | null | undefined;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "A confirmação de senha não confere"),
});

export const Profile = () => {
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/thiagotnon.png"
  );
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

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
          toast.show({
            placement: "bottom",
            render: ({ id }) => (
              <Toast
                nativeID={"toast-" + id}
                action="attention"
                variant="solid"
                backgroundColor="$red500"
              >
                <VStack space="xs">
                  <ToastTitle color="$white">Imagem muito grande.</ToastTitle>
                  <ToastDescription color="$white">
                    Escolha uma de até 3MB.
                  </ToastDescription>
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

  async function handleProfileUpdate(data: FormDataProps) {
    console.log(data);
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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                isDisabled
              />
            )}
          />
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
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha atual"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            w="$full"
            bg="$emerald500"
            h={50}
            sx={{
              ":active": {
                bg: "$emerald600",
              },
            }}
            onPress={handleSubmit(handleProfileUpdate)}
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
