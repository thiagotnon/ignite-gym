import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import {
  Center,
  HStack,
  Heading,
  Text,
  Toast,
  ToastDescription,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("antebraço");

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId });
  }

  async function fetchGroups() {
    try {
      const response = await api.get("groups");
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares.";

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
    }
  }
  async function fetchExerciseByGroups() {
    try {
      setIsLoading(true);

      const response = await api.get(`exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios.";

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

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExerciseByGroups();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => `${item}`}
        renderItem={({ item }) => (
          <Group
            name={`${item}`}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(`${item}`)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        style={{ marginVertical: 20, maxHeight: 40, minHeight: 40 }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px="$5">
          <HStack justifyContent="space-between" mb="$4">
            <Heading color="$secondary200" fontSize="$md" fontFamily="$heading">
              Exercícios
            </Heading>
            <Text color="$secondary200" fontSize="$sm">
              {exercises.length}
            </Text>
          </HStack>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </VStack>
      )}
    </VStack>
  );
};
