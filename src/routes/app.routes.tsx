import { Platform, TouchableOpacity } from "react-native";
import { useToken } from "@gluestack-ui/themed";

import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import HomeSvg from "@assets/home.svg";
import ProfileSvg from "@assets/profile.svg";
import HistorySvg from "@assets/history.svg";

import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";
import { Exercise } from "@screens/Exercise";

type AppRoutes = {
  home: undefined;
  exercise: { exerciseId: string };
  profile: undefined;
  history: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export const AppRoutes = () => {
  const space = useToken("space", "7");
  const normal = useToken("colors", "secondary300");
  const bg = useToken("colors", "secondary900");
  const active = useToken("colors", "emerald500");

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: normal,
        tabBarStyle: {
          backgroundColor: bg,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 46,
          paddingBottom: space + 12,
          paddingTop: space,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={space} height={space} />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={space} height={space} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={space} height={space} />
          ),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
};
