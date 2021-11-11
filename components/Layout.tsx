import { Flex } from "@chakra-ui/layout";
import React from "react";

const Layout: React.FC<{}> = (props) => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      {props.children}
    </Flex>
  )
}

export default Layout;