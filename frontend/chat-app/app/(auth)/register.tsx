import React, { useContext, useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

import { AuthContext } from "@/context/authContext";

const Register = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useContext(AuthContext);
  const handleSubmit = async () => {
    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      // Handle empty fields
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    try {
      setIsLoading(true);
      await signUp(nameRef.current, emailRef.current, passwordRef.current, "");
    } catch (error: any) {
      7;
      Alert.alert("Registration Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScreenWrapper showPattern={true} bgOpacity={0.5}>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton iconSize={28} />
            <Typo size={17} color={colors.white}>
              Need some help?
            </Typo>
          </View>
          <View style={styles.content}>
            <ScrollView
              style={styles.form}
              contentContainerStyle={styles.form}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ gap: spacingX._10, marginBottom: spacingY._15 }}>
                <Typo size={28} fontWeight={"600"}>
                  Getting Started
                </Typo>
                <Typo color={colors.neutral600}>Getting Started</Typo>
              </View>
              <Input
                placeholder="Enter your name"
                onChangeText={(value: string) => (nameRef.current = value)}
                icon={
                  <Icons.User
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />
              <Input
                placeholder="Enter your email"
                onChangeText={(value: string) => (emailRef.current = value)}
                icon={
                  <Icons.At
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />
              <Input
                placeholder="Enter your password"
                onChangeText={(value: string) => (passwordRef.current = value)}
                secureTextEntry={true}
                icon={
                  <Icons.Lock
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />
              <View style={{ marginTop: spacingX._25, gap: spacingY._10 }}>
                <Button loading={isLoading} onPress={handleSubmit}>
                  <Typo fontWeight={"bold"} size={20} color={colors.black}>
                    Sign Up
                  </Typo>
                </Button>

                <View style={styles.footer}>
                  <Typo size={14} color={colors.neutral600}>
                    Already have an account?
                  </Typo>
                  <Pressable onPress={() => router.push("/(auth)/login")}>
                    <Typo size={14} fontWeight={"bold"} color={colors.primary}>
                      {" "}
                      Log In
                    </Typo>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    paddingHorizontal: spacingX._20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: Dimensions.get("window").height,
    top: spacingY._30,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
  },
  form: { gap: spacingY._15, marginTop: spacingY._20 },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline", // <-- important for vertical text alignment
    gap: 5,
  },
});
