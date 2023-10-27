import { HStack, Heading, Text, VStack, Icon } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";
import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {};
export const ExerciseCard = ({ ...rest }: Props) => {
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
            uri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2120&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            Alongamento
          </Heading>
          <Text fontSize="$sm" color="$secondary200" mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
        <Icon as={ChevronRight} color="$secondary700" size="xl" mr={10} />
      </HStack>
    </TouchableOpacity>
  );
};
