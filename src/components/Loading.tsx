import { Center, Spinner } from "@gluestack-ui/themed";

export const Loading = () => {
  return (
    <Center flex={1} bg="$secondary950" width="100%">
      <Spinner color="$emerald500" size="large" />
    </Center>
  );
};
