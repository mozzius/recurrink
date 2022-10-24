import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { supabase } from "../../utils/supabase";

export const RegisterScreen = () => {
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
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Sign in"
        onPress={async () => {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) {
            console.log(error);
          }
        }}
      />
    </View>
  );
};
