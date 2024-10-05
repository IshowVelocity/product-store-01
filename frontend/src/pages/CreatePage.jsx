import { Box, Container, Heading, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product.js";

const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      image: ''
    });

    const {createProduct}=useProductStore();
    const toast=useToast();

    const handleAddProduct = async() => {
      const {success,message}=await createProduct(newProduct);
      if(!success){
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } 
      else{
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 5000,
          isClosable: true,
      });
    }
  }
  return (
    <Container maxW={Container.sm}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} mt={10}>
          Create a new product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder={"Product Name"}
              name={"name"}
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder={"Product Price"}
              name={"price"}
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder={"Product Image URL"}
              name={"image"}
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage
