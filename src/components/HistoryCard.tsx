import { HistoryDTO } from "@dtos/HistoryDTO";
import { HStack, Heading, Text, VStack } from "@gluestack-ui/themed";

type Props = {
  data: HistoryDTO;
};
export const HistoryCard = ({ data }: Props) => {
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
          {data?.group}
        </Heading>
        <Text color="$secondary100" fontSize="$lg" numberOfLines={1}>
          {data?.name}
        </Text>
      </VStack>
      <Text color="$secondary300" fontSize="$md">
        {data?.hour}
      </Text>
    </HStack>
  );
};
