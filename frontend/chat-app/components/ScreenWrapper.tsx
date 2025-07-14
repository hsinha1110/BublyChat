import React from "react";
import {
  View,
  Platform,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import type { ScreenWrapperProps } from "../types";
import { ImageBackground } from "expo-image";
import { colors } from "@/constants/theme";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({
  style,
  children,
  showPattern = false,
  isModal = false,
  bgOpacity = 1,
}: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 40;
  let paddingBottom = 0;

  if (!isModal) {
    paddingTop = Platform.OS === "ios" ? height * 0.02 : 45;
    paddingBottom = height * 0.02;
  }

  return (
    <ImageBackground
      source={require("../assets/images/bgPattern.png")}
      style={{
        flex: 1,
        backgroundColor: isModal ? colors.white : colors.neutral900,
      }}
      imageStyle={{
        opacity: showPattern ? bgOpacity : 0,
      }}
    >
      <SafeAreaView
        style={[
          {
            flex: 1,
            paddingTop,
            paddingBottom,
          },
          style,
        ]}
      >
        <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} />
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ScreenWrapper;
