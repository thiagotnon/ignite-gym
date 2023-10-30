import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import {
  VStack,
  Text,
  Center,
  Heading,
  Button,
  ScrollView,
  useToast,
  Toast,
  ToastDescription,
  HStack,
} from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Controller, useForm } from "react-hook-form";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { ButtonSpinner } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o email.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password"), ""], "A confirmação da senha não confere."),
});

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ email, name, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await api.post("users", { email, name, password });
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a tonta.\nTente novamente mais tarde.";
      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast
            nativeID={"toast-" + id}
            action="error"
            variant="solid"
            backgroundColor="$red500"
          >
            <VStack space="xs">
              <ToastDescription color="$white">{title}</ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      w="$full"
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        width="$full"
        borderWidth={1}
        justifyContent="space-between"
      >
        <VStack width="$full" px={20}>
          <Image
            source={BackgroundImg}
            defaultSource={BackgroundImg}
            alt="Pessoas treinando"
            resizeMode="contain"
            style={{ position: "absolute" }}
          />
          <Center my={100}>
            <LogoSvg />
            <Text color="$secondary100" fontSize="$sm">
              Treine sua mente e o seu corpo
            </Text>
          </Center>
          <Center>
            <Heading
              color="$secondary100"
              fontSize="$xl"
              mb={20}
              fontFamily="$heading"
            >
              Criar sua conta
            </Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder="Nome"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
              rules={{
                required: "Confirme a senha",
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder="Confirmar senha"
                  secureTextEntry
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
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
              onPress={handleSubmit(handleSignUp)}
              isDisabled={isLoading}
            >
              {isLoading ? (
                <HStack>
                  <ButtonSpinner mr="$1" />
                  <Text
                    color="$emerald100"
                    fontFamily="$heading"
                    fontSize="$sm"
                  >
                    Por favor, aguarde...
                  </Text>
                </HStack>
              ) : (
                <Text color="$emerald100" fontFamily="$heading" fontSize="$sm">
                  Criar e acessar
                </Text>
              )}
            </Button>
          </Center>
        </VStack>
        <VStack px={20} pb={20} mt="$6">
          <Button
            variant="outline"
            w="$full"
            borderColor="$emerald500"
            h={50}
            sx={{
              ":active": {
                bg: "$secondary800",
              },
            }}
            onPress={handleGoBack}
          >
            <Text color="$emerald500" fontFamily="$heading" fontSize="$sm">
              Voltar para o login
            </Text>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
