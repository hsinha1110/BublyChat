import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";

const Login = () => {
  return (
    <ScreenWrapper bgOpacity={0}>
      <Typo color={colors.white}>Register</Typo>
    </ScreenWrapper>
  );
};

export default Login;
