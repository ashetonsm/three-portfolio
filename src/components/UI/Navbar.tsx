import { ReactNode, useState, useEffect } from 'react';
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
    Button,
    useColorMode,
    Progress,
} from '@chakra-ui/react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import React from 'react';

const Links = ['Home', '3D', '2D', 'Contact'];

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={children?.toString().toLowerCase()}>
        {children}
    </Link>
);

export default function Navbar({ children }: { children: ReactNode }) {
    const [width, setWidth] = useState(0)

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const scrollHeight = () => {
    
        var el = document.documentElement,
        ScrollTop = el.scrollTop || document.body.scrollTop,
        ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    
        var percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;
        setWidth(percent)
        return (percent)
    }
    
    useEffect(() => {
        window.addEventListener("scroll", scrollHeight)
      
        return () => {
          window.removeEventListener("scroll", scrollHeight)
        }
      })


    return (
        <>
            <Box width="100%" position='sticky' top={0} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Progress hasStripe value={width}  />
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <FiX /> : <FiMenu />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Asheton S. M.</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                        <HStack>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <FiMoon /> : <FiSun />}
                            </Button>
                        </HStack>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4}>{children}</Box>
        </>
    );
}