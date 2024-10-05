import { Container, textDecoration, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { VStack,Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product.js'
import { SimpleGrid } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard.jsx'

const HomePage = () => {
  const {fetchProducts,products}=useProductStore();
  useEffect(()=>{
    fetchProducts();
  },[fetchProducts]);
  console.log("products:", products);

  return (
    <Container maxW='container.xl' py={12}>
<VStack spacing={8}>
      <Text
            color={useColorModeValue('gray.700','gray.300')}

            fontSize='4xl'
            fontWeight='extrabold'
            >
              Current Products 🚀
        </Text>

        <SimpleGrid 
        columns={{base:1,md:2,lg:3}} 
        spacing={10} w={'full'}
        >
          {products.map((product)=>(
            <ProductCard key={product._id} product={product} />
          ))}
          </SimpleGrid>


          {products.length===0 && (
             <Text fontSize='xl' textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
             No products found. 😢 {" "}
             <Link to='/create'>
             <Text as="span" color={'blue.500'} _hover={{textDecoration: "underline"}}>
               Create a new product 🛒
             </Text>
             </Link>
           </Text>
          )}
</VStack>

    </Container>
  )
}

export default HomePage