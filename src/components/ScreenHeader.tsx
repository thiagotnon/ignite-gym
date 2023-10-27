import { Center, Heading } from "@gluestack-ui/themed";
type Props = {
  title: string;
};
export const ScreenHeader = ({ title }: Props) => {
  return (
    <Center bg="$secondary900" pt="$12" pb="$4" px="$5" alignItems="center">
      <Heading color="$secondary100" fontSize="$xl" fontFamily="$heading">
        {title}
      </Heading>
    </Center>
  );
};
