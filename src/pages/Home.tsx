import { Grid, Card, CardBody, Image, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useToast, Button, Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Form from '../components/CarForm';
import { API_URL, CAR_BRANDS } from '../common/constants';
import { useNavigate } from 'react-router-dom';
import { CarDetails } from '../common/types';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const navigate = useNavigate()

  const [brand, setBrand] = useState("");

  async function submitHandler(formValues: CarDetails) {
    try {
      await fetch(`${API_URL}/cars`, {
        method: "POST", body: JSON.stringify(formValues),
      })
      toast({
        title: 'Car added successfully.',
        duration: 3000,
        status: 'success'
      })
      console.log('******Car details*******')
      console.table(formValues)
    } catch (error) {
      toast({
        title: 'Something went wrong. Try again',
        duration: 3000,
        status: 'error'
      })
    }
    onClose()
    setBrand("")
  }

  useEffect(() => {
    // Attaching click event for the container instead of each card as event delegation strategy
    document.getElementById("brands-grid")?.addEventListener("click", (e: MouseEvent) => {
      const brandCard: HTMLElement | null = (e.target as HTMLElement).closest("[data-brand]");
      if (brandCard) {
        const brand = brandCard.dataset.brand
        if (brand) {
          setBrand(brand);
          onOpen();
        }
      } else {
        setBrand("")
        onClose();
      }
    })
  }, [onOpen, onClose])

  return (
    <Flex h="100%" flexDirection="column" gap={10} alignItems="stretch">
      <Box>
        <Button onClick={() => navigate("/find-car")} m={"0"} colorScheme='teal'>Find cars</Button>
      </Box>
      <Grid templateColumns='repeat(5, 1fr)' gap={30} bg="#adadad" p="30" placeItems={"center"} id="brands-grid">
        {CAR_BRANDS.map((brand) => (
          <Card maxW='sm' key={brand.name} bg="white" borderRadius={4} boxSize={"200px"} align="center" justify={"center"} cursor="pointer" data-brand={brand.name}>
            <CardBody>
              <Image
                src={brand.logo}
                alt={brand.name}
                borderRadius={4}
                boxSize='100px'
              />
              <Text>{brand.name}</Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Car details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form brand={brand} onSubmit={submitHandler} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Home;