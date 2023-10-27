import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, SectionList, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";

export const History = () => {
  const [exercises, setExercises] = useState([
    {
      title: "20.07.2023",
      data: ["Pizza", "Burger", "Risotto"],
    },
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Historico de exercícios" />

      <SectionList
        sections={[]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <HistoryCard />}
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
        px="$5"
        contentContainerStyle={
          [].length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="$secondary100" textAlign="center">
            Ainda não há exercícios registrados. {"\n"}
            Vamos fazer exercícios hoje?
          </Text>
        )}
      />
    </VStack>
  );
};
