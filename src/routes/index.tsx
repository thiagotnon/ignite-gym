import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useToken } from "@gluestack-ui/themed";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export const Routes = () => {
  const gluestackToken = useToken("colors", "secondary950");
  const theme = DefaultTheme;
  theme.colors.background = gluestackToken;
  return (
    <Box flex={1} bg="$secondary950">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
};
