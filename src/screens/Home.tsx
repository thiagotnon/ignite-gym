import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import {
  Center,
  FlatList,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useState } from "react";

export const Home = () => {
  const [groups, setGroups] = useState<string[]>([
    "costas",
    "ombros",
    "bíceps",
    "tríceps",
  ]);
  const [exercises, setExercises] = useState<string[]>([
    "costas",
    "ombros",
    "bíceps",
    "tríceps",
  ]);
  const [groupSelected, setGroupSelected] = useState("costas");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

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
        my={20}
        maxHeight={40}
        minHeight={40}
      />
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
          keyExtractor={(item) => `${item}`}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </VStack>
    </VStack>
  );
};
