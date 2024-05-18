import React from "react";
import LottieView from "lottie-react-native";
const Animatedicon = ({ width = 150, height = 150, source, ...props }) => {
  return <LottieView source={source} style={{ width, height }} {...props} />;
};

export default Animatedicon;
