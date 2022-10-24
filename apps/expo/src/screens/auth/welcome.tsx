import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import { WelcomeProps } from "./types";

export const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeProps>();
  return (
    <View>
      <Button
        title="Sign in"
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
};
