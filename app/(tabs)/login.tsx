
import { StyleSheet, Image, Platform } from 'react-native';
import { NativeBaseProvider,Center,Box,Heading,VStack,FormControl,Input,Link,Button,HStack,Text} from 'native-base';



export default function TabTwoScreen() {
    return (
        <NativeBaseProvider>
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }}>
                Iniciar Sesión
                </Heading>
                <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                Introduce tu correo y contraseña!
                </Heading>

                <Image
                    source={require('@/assets/images/personal4.png')}
                />

                <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Correo</FormControl.Label>
                    <Input />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Contraseña</FormControl.Label>
                    <Input type="password" />
                    <Link _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500"
                }} alignSelf="flex-end" mt="1">
                    ¿Olvidaste tu contraseña?
                    </Link>
                </FormControl>
                <Button mt="2" colorScheme="red">
                    Iniciar Sesión
                </Button>
                <HStack mt="6" justifyContent="center">
                    <Text fontSize="sm" color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }}>
                    ¿No tienes una cuenta?.{" "}
                    </Text>
                    <Link _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm"
                }} href="#">
                    Registrate
                    </Link>
                </HStack>
                </VStack>
            </Box>
            </Center>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
