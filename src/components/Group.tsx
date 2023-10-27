import { Pressable, Text } from "@gluestack-ui/themed";
import { PressableProps } from "react-native";
type Props = PressableProps & {
  name: string;
  isActive: boolean;
};

export const Group = ({ name, isActive, ...rest }: Props) => {
  return (
    <Pressable
      {...rest}
      bg="$secondary900"
      alignItems="center"
      justifyContent="center"
      w={100}
      h={40}
      rounded="$lg"
      mr={10}
      borderWidth={1}
      borderColor={isActive ? "$emerald500" : "transparent"}
    >
      <Text
        color={isActive ? "$emerald500" : "$secondary200"}
        textTransform="uppercase"
        fontSize="$xs"
        fontWeight="$bold"
      >
        {name}
      </Text>
    </Pressable>
  );
};
