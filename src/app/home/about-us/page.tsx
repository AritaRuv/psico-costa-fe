import { Box, Heading, Text } from "@chakra-ui/react";

export default function AboutUsPage() {
 return (
   <Box textAlign="center" py={10} px={6} bg="gray.50" minHeight="100vh">
     <Heading as="h1" size="2xl" color="teal.500" mb={6}>
       Sobre Nosotros
     </Heading>
     <Text fontSize="lg" color="gray.600">
       Somos un equipo de profesionales dedicados a brindar apoyo psicológico
       en un entorno seguro y confiable.
     </Text>
   </Box>
 );
}