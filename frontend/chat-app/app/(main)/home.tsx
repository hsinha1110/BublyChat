import React, { useContext } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { AuthContext } from "@/context/authContext";
import { colors } from "@/constants/theme";
import Button from "@/components/Button";

const Home = () => {
  const { user, signOut } = useContext(AuthContext);
  console.log("User:", user);
  return (
    <ScreenWrapper bgOpacity={0}>
      <Typo color={colors.white}>Home</Typo>
      <Button onPress={() => signOut()}>
        <Typo>Log Out</Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default Home;
