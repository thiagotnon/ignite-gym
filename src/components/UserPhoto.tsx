import { useToken } from "@gluestack-style/react";
import { Image, ImageProps } from "react-native";

type Props = ImageProps & {
  size: number;
};

export const UserPhoto = ({ size, ...rest }: Props) => {
  const color = useToken("colors", "emerald500");
  return (
    <Image
      style={{
        borderRadius: 500,
        height: size,
        width: size,
        borderWidth: 4,
        borderColor: color,
      }}
      {...rest}
    />
  );
};
