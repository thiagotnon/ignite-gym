import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryGroupByDayDTO } from "@dtos/HistoryByDayDTO";
import {
  Heading,
  Text,
  Toast,
  ToastDescription,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";

export const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryGroupByDayDTO[]>([]);
  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("history");
      setExercises(response.data);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o seu histórico";
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
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );
  return (
    <VStack flex={1}>
      <ScreenHeader title="Historico de exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              fontSize="$md"
              mt="$5"
              mb="$1"
              color="$secondary200"
              fontFamily="$heading"
            >
              {section.title}
            </Heading>
          )}
          style={{ paddingHorizontal: 20 }}
          contentContainerStyle={
            [].length === 0 && { flex: 1, justifyContent: "flex-start" }
          }
          ListEmptyComponent={() => (
            <Text color="$secondary100" textAlign="center">
              Ainda não há exercícios registrados. {"\n"}
              Vamos fazer exercícios hoje?
            </Text>
          )}
        />
      )}
    </VStack>
  );
};
