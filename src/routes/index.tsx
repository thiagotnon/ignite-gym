import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useToken } from "@gluestack-ui/themed";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export const Routes = () => {
  const { user, isLoadingUserStorageData } = useAuth();
  const gluestackToken = useToken("colors", "secondary950");
  const theme = DefaultTheme;
  theme.colors.background = gluestackToken;

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="$secondary950">
      <NavigationContainer>
        {Object.keys(user).length !== 0 ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
