import { Box, Flex, Link, Button, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Navbar() {
  return (
    <Box bg="teal.500" px={4} py={3} color="white">
      <Flex alignItems="center">
        <Link as={NextLink} href="/" fontSize="lg" fontWeight="bold" _hover={{ textDecoration: "none", color: "teal.200" }}>
          Centro Psicológico
        </Link>
        <Spacer />
        <Flex gap={4}>
          <Link as={NextLink} href="/home" _hover={{ textDecoration: "none", color: "teal.200" }}>
            Home
          </Link>
          <Link as={NextLink} href="/home/about-us" _hover={{ textDecoration: "none", color: "teal.200" }}>
            Sobre Nosotros
          </Link>
          <Link as={NextLink} href="/home/contact-us" _hover={{ textDecoration: "none", color: "teal.200" }}>
            Contáctanos
          </Link>
          <Button  colorScheme="teal" variant="outline" size="sm" _hover={{ bg: "teal.600" }}>
           <Link as={NextLink}  href="/home/login" > Iniciar Sesión</Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}