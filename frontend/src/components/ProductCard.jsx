import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  Button,
  IconButton,
  VStack,
  Input,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useProductStore } from "../store/product.js";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const ProductCard = ({ product }) => {

  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct ,updateProduct} = useProductStore();
 
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success,message}=await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Product updated Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
  };

  const HandleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const textcolor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontSize="xl" fontWeight="bold" color={textcolor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => HandleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder={"Product Name"} name={"name"} value={updatedProduct.name} 
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              } />
              <Input placeholder={"Product Price"} name={"price"} value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              } />
              <Input placeholder={"Product Image URL"} name={"image"} value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              } />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>handleUpdateProduct(product._id,updatedProduct)}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
