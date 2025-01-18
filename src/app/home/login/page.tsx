import { Box, Heading, Input, Button, VStack, Text } from "@chakra-ui/react";
export default function LoginPage() {
  return (
    <>
      <Box py={10} px={6} bg="gray.50" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box maxWidth="400px" width="100%" bg="white" p={6} borderRadius="md" boxShadow="md">
          <Heading as="h1" size="lg" color="teal.500" textAlign="center" mb={6}>
            Iniciar Sesión
          </Heading>
          <VStack gap={4}>
            <Box width="100%">
              <Text as="label" htmlContent="email" fontWeight="bold">
                Email
              </Text>
              <Input id="email" type="email" placeholder="Tu email" borderColor="teal.500" />
            </Box>
            <Box width="100%">
              <Text as="label" htmlContent="email"  fontWeight="bold">
                Contraseña
              </Text>
              <Input id="password" type="password" placeholder="Tu contraseña" borderColor="teal.500" />
            </Box>
            <Button colorScheme="teal" width="100%">
              Iniciar Sesión
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
}
