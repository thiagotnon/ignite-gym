import {
  Input as InputGluestack,
  InputField,
  FormControl,
  Text,
} from "@gluestack-ui/themed";

import { TextInputProps } from "react-native";

type Props = TextInputProps & {
  isDisabled?: boolean;
  errorMessage?: string | null;
};

export const Input = ({ isDisabled, errorMessage = null, ...rest }: Props) => {
  const isInvalid = !!errorMessage;

  return (
    <FormControl isInvalid={isInvalid} mb={15}>
      <InputGluestack
        bg="$secondary900"
        width="$full"
        h={50}
        borderWidth={0}
        rounded="$sm"
        {...rest}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        sx={{
          ":invalid": {
            borderWidth: 1,
            borderColor: "$red500",
          },
        }}
      >
        <InputField
          {...rest}
          px={15}
          color="$white"
          sx={{
            ":focus": {
              borderWidth: isInvalid ? 0 : 1,
              borderColor: "$emerald500",
              rounded: "$sm",
              px: 15,
            },
          }}
        />
      </InputGluestack>
      <FormControl.Error>
        <Text color="$red400" fontSize="$sm">
          {errorMessage}
        </Text>
      </FormControl.Error>
    </FormControl>
  );
};
