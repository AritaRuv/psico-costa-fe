import { Box, Heading, Input, Textarea, Button, VStack } from "@chakra-ui/react";

export default function ContactUsPage() {
 return (
   <Box py={10} px={6} bg="white" minHeight="100vh">
     <Heading as="h1" size="2xl" color="teal.500" textAlign="center" mb={6}>
       Contáctanos
     </Heading>
     <Box maxWidth="500px" mx="auto">
       <VStack gap={4}>
         <Box width="100%">
           <label>Nombre</label>
           <Input placeholder="Tu nombre" focusRingColor="teal.500" />
         </Box>
         <Box width="100%">
           <label>Email</label>
           <Input type="email" placeholder="Tu email" focusRingColor="teal.500" />
         </Box>
         <Box width="100%">
           <label>Mensaje</label>
           <Textarea placeholder="Tu mensaje" focusRingColor="teal.500" />
         </Box>
         <Button colorScheme="teal" width="100%" mt={4}>
           Enviar
         </Button>
       </VStack>
     </Box>
   </Box>
 );
}
