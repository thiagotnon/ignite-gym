import { HStack, Heading, Text, VStack } from "@gluestack-ui/themed";

export const HistoryCard = () => {
  return (
    <HStack
      w="$full"
      px="$5"
      py="$4"
      mb="$3"
      bg="$secondary900"
      rounded="$md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr="$5" flex={1}>
        <Heading
          color="$white"
          fontSize="$md"
          fontFamily="$heading"
          textTransform="capitalize"
          numberOfLines={1}
        >
          Alongamento
        </Heading>
        <Text color="$secondary100" fontSize="$lg" numberOfLines={1}>
          Puxada Vertical
        </Text>
      </VStack>
      <Text color="$secondary300" fontSize="$md">
        08:56
      </Text>
    </HStack>
  );
};
