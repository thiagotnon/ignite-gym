import { Image, TouchableOpacity } from "react-native";
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Heading,
  Button,
  ScrollView,
  useToast,
  Toast,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { useEffect, useState } from "react";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ToastDescription } from "@gluestack-ui/themed";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  exerciseId: string;
};

export const Exercise = () => {
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const toast = useToast();

  const { exerciseId } = route.params as RouteParamsProps;

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o exercício.";

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

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);
      await api.post("history", { exercise_id: exerciseId });

      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast
            nativeID={"toast-" + id}
            action="success"
            variant="solid"
            backgroundColor="$emerald500"
          >
            <VStack space="xs">
              <ToastDescription color="$white">
                Parabéns! Exercício registrado no seu histórico
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício.";

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
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);
  return (
    <VStack flex={1}>
      <VStack bg="$secondary900" pt="$12" pb="$4" px="$5">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$emerald500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt="$4"
          mb="$3"
          alignItems="center"
        >
          <Heading
            color="$secondary100"
            fontSize="$lg"
            flexShrink={1}
            fontFamily="$heading"
          >
            {exercise?.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$secondary100" ml="$1" textTransform="capitalize">
              {exercise?.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <VStack p="$6">
          <Image
            source={{
              uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
            }}
            alt="exercício"
            height={330}
            borderRadius={10}
            resizeMode="cover"
            style={{ marginBottom: 10 }}
          />

          <Box bg="$secondary900" rounded="$md" pb="$4" px="$4">
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb="$6"
              mt="$5"
            >
              <HStack>
                <SeriesSvg />
                <Text color="$secondary200" ml="$2">
                  {exercise?.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color="$secondary200" ml="$2">
                  {exercise?.repetitions} repetições
                </Text>
              </HStack>
            </HStack>
            <Button
              w="$full"
              bg="$emerald500"
              h={50}
              sx={{
                ":active": {
                  bg: "$emerald600",
                },
              }}
              onPress={handleExerciseHistoryRegister}
              isDisabled={sendingRegister}
            >
              {sendingRegister ? (
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
                  Realizado
                </Text>
              )}
            </Button>
          </Box>
        </VStack>
      )}
    </VStack>
  );
};
