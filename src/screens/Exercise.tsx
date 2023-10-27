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
} from "@gluestack-ui/themed";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

export const Exercise = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }
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
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$secondary100" ml="$1" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p="$6">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2120&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            alt="exercício"
            height={330}
            borderRadius={4}
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
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color="$secondary200" ml="$2">
                  12 repetições
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
            >
              <Text color="$emerald100" fontFamily="$heading" fontSize="$sm">
                Realizado
              </Text>
            </Button>
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
