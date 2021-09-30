import { Flex, FlexProps, chakra } from "@chakra-ui/react";
import NextImage, { ImageProps } from "next/image";

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
    ].includes(prop),
});

function ChakraNextImage(props: ImageProps & FlexProps) {
  const { src, alt, width, quality, height, ...rest } = props;
  return (
    <Flex pos="relative" {...rest}>
      <ChakraNextUnwrappedImage
        w="auto"
        h="auto"
        width={width}
        quality={quality}
        height={height}
        src={src}
        alt={alt}
      />
    </Flex>
  );
}

export default ChakraNextImage;
