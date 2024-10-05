import React from 'react'
import { Link } from 'react-router-dom'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Container,Flex,Text, HStack,Button,useColorMode, useColorModeValue} from '@chakra-ui/react'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'




const Navbar = () => {
    const {colormode, toggleColorMode} = useColorMode();
  return <Container maxW={"1240px"} px={4}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm: "row"
            }}
        >
            <Text as={"span"}
            bgGradient='linear(to-l, #000b4a, #5870f5)'
            bgClip='text'
            fontSize='5xl'
            fontWeight='extrabold'
            >
                <Link to={"/"}>Ramesh Digital Store 🛒</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <PlusSquareIcon fontSize={24} />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {useColorModeValue(<LuSun />, <IoMoon />)}
                </Button>
            </HStack>
        </Flex>
    </Container>
};

export default Navbar
