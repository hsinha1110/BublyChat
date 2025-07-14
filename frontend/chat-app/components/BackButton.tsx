import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { BackButtonProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import { CaretLeftIcon } from "phosphor-react-native";

const BackButton = ({
  style,
  iconSize = 26,
  color = colors.white,
}: BackButtonProps) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/welcome");
    }
  };

  return (
    <TouchableOpacity onPress={handleBackPress} style={[styles.button, style]}>
      <CaretLeftIcon
        size={verticalScale(iconSize)}
        color={color}
        weight="bold"
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {},
});
