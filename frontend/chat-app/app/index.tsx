import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const SplashScreen = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     router.replace("/(auth)/welcome");
  //   }, 1500); // ⏱️ wait 1.5 seconds before navigating

  //   return () => clearTimeout(timeout); // cleanup
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />
      <Animated.Image
        source={require("../assets/images/splashImage.png")}
        entering={FadeInDown.duration(700).springify()}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "23%",
    aspectRatio: 1,
  },
});
