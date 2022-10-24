import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { supabase } from "../../utils/supabase";

export const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        keyboardType="email-address"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Sign in"
        onPress={async () => {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) {
            Alert.alert(error.message);
          }
        }}
      />
    </View>
  );
};
