import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import {
  VStack,
  Text,
  Center,
  Heading,
  Button,
  ScrollView,
  Toast,
  ToastDescription,
  useToast,
  ButtonSpinner,
  HStack,
} from "@gluestack-ui/themed";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Controller, useForm } from "react-hook-form";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  email: string;
  password: string;
};

const signUpSchema = yup.object({
  email: yup.string().required("Informe o email.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
});

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde.";

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
              <ToastDescription color="$white">{title}</ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    } finally {
      setIsLoading(false);
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
              Acesse sua conta
            </Heading>
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

            <Button
              w="$full"
              bg="$emerald500"
              h={50}
              sx={{
                ":active": {
                  bg: "$emerald600",
                },
              }}
              onPress={handleSubmit(handleSignIn)}
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
                  Entrar
                </Text>
              )}
            </Button>
          </Center>
        </VStack>
        <VStack px={20} pb={20}>
          <Center>
            <Text color="$white" fontFamily="$heading" fontSize="$sm" mb={10}>
              Ainda não tem acesso?
            </Text>
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
              onPress={handleNewAccount}
            >
              <Text color="$emerald500" fontFamily="$heading" fontSize="$sm">
                Criar conta
              </Text>
            </Button>
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
