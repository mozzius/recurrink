import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { RegisterScreen } from "./register";
import { SignInScreen } from "./signin";
import { WelcomeScreen } from "./welcome";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};
