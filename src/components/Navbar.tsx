import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  Text,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ReactPixel from "react-facebook-pixel";
import "./Navbar.css";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  ReactPixel.init("435714932594774");
  ReactPixel.pageView();
  ReactPixel.track("PageView");

  const onButtonClick = () => {
    ReactPixel.track("Purchase", {
      value: 9.99,
      currency: "USD",
    });
    console.log("Purchase was made!");
  };

  const navButtons = [
    { text: "Home", href: "#Home" },
    { text: "About", href: "#About" },
    { text: "Listings", href: "#Listings" },
    { text: "Partners", href: "#Partners" },
    { text: "Contact", href: "#Contact" },
  ];

  return (
    <div id="navFix">
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={9} width={["100%"]}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack w="42%">
            <Text
              as="b"
              fontSize={{ base: "18px", md: "24px", lg: "30px" }}
              style={{ textShadow: "#FC0 1px 0 10px" }}
            >
              My GG Shop
            </Text>
          </HStack>

          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <HStack spacing={8} alignItems={"center"}>
              <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }} id="myDIV">
                {navButtons.map((button) => (
                  <Button className="btnRes" key={button.text}>
                    <a href={button.href}>
                      <b>{button.text}</b>
                    </a>
                  </Button>
                ))}
              </HStack>
            </HStack>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>

              <Button
                backgroundColor="#a891b7"
                _hover={{ bg: "#a891b7", color: "black" }}
                color="white"
                variant="solid"
                onClick={onButtonClick}
                size={["sm", "md"]}
                id="resumeBtn"
              >
                Purchase
              </Button>
            </Stack>
          </Flex>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {navButtons.map((button) => (
                  <Button
                    onClick={isOpen ? onClose : onOpen}
                    _hover={{
                      textShadow: "#FC0 1px 0 10px",
                      transform: "scale(1.2)",
                    }}
                    key={button.text}
                  >
                    <a href={button.href}>
                      <b>{button.text}</b>
                    </a>
                  </Button>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Flex>
      </Box>
    </div>
  );
}
