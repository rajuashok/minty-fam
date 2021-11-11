import { Flex } from "@chakra-ui/layout";
import React from "react";

const Content: React.FC<{}> = (props) => {
  return (
    <Flex
      height={[
        "100%",
        "100%",
        "100%",
        "initial"
      ]}
      width={[
        "100%",
        "100%",
        "100%",
        "initial"
      ]}
      bgColor="gray.200"
      direction="column"
      alignItems="center"
      padding={20}
      rounded={[
        0,
        0,
        0,
        10
      ]}
      boxShadow="md">
        {props.children}
    </Flex>
  )
}

export default Content;