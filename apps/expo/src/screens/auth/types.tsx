import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Register: undefined;
};

export type WelcomeProps = NativeStackNavigationProp<
  AuthStackParamList,
  "Welcome"
>;
export type SignInProps = NativeStackNavigationProp<
  AuthStackParamList,
  "SignIn"
>;
export type RegisterProps = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;
