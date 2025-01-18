import { Box, Button, Heading, Text } from "@chakra-ui/react";

export default function LandingPage() {
 return (
   <Box textAlign="center" py={10} px={6} bg="gray.50" minHeight="100vh">
     <Heading as="h1" size="2xl" color="teal.500" mb={6}>
       Bienvenidos al Centro Psicológico
     </Heading>
     <Text fontSize="lg" color="gray.600" mb={8}>
       Un espacio para tu bienestar emocional.
     </Text>
     <Button colorScheme="teal" size="lg">   {/* // href="/about-us" */}
       Conócenos
     </Button>
   </Box>
 );
}