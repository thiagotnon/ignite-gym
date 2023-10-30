import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { HStack, Heading, Text, VStack, Icon } from "@gluestack-ui/themed";
import { api } from "@services/api";
import { ChevronRight } from "lucide-react-native";
import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
};
export const ExerciseCard = ({ data, ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$secondary900"
        rounded="$md"
        pr={5}
        p={10}
        alignItems="center"
        mb={10}
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="exercício"
          width={80}
          height={80}
          borderRadius={4}
          style={{ marginRight: 20 }}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white" fontFamily="$heading">
            {data.name}
          </Heading>
          <Text fontSize="$sm" color="$secondary200" mt={1} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon as={ChevronRight} color="$secondary700" size="xl" mr={10} />
      </HStack>
    </TouchableOpacity>
  );
};
