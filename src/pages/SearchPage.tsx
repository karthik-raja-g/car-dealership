import { Box, Button, Card, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react'
import FilterForm from '../components/FilterForm'
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarDetails } from '../common/types';
import { API_URL } from '../common/constants';

type SingleInfoProps = {
  title: string,
  value: string
}

type PageState = {
  loading: boolean,
  cars: Array<CarDetails> | []
}
function constructQuery(obj: Record<string, string> = {}): string {
  const keys = Object.keys(obj);
  const queryObj: Record<string, string> = {};
  keys.forEach((key: string) => {
    if (['location', 'brand', 'transmission', 'fuelType', 'bodyType', 'noOfOwners'].includes(key)) {
      if (obj[key]) queryObj[key] = obj[key]
    }
  })
  const queryString = new URLSearchParams(queryObj).toString();
  return queryString;
}

function reducer(state: PageState, action: { type: string, cars?: Array<CarDetails> }) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true }
    case 'success':
      return { ...state, loading: false, cars: action.cars }
    case 'error': {
      return { ...state, loading: false, cars: [] }
    }
    default:
      return state
  }
}


const SingleInfo = ({ title, value }: SingleInfoProps) =>
  <Flex alignItems="center" gap="2">
    <Heading size="sm">{title}: </Heading>
    <Text casing={'capitalize'}>{value}</Text>
  </Flex>

const SearchPage = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, { loading: false, cars: [] })

  const handleChange = async (filters = {}) => {
    try {
      dispatch({ type: 'loading' })
      const query = constructQuery(filters)
      const res = await fetch(`${API_URL}/cars?` + query, {
        method: 'GET'
      })
      const data = await res.json()
      dispatch({ type: 'success', cars: data })
    } catch (error) {
      dispatch({ type: 'error' })
    }
  }


  return (
    <Flex h="100%" flexDirection="column" gap={10} alignItems="stretch" overflow="hidden">
      <Box>
        <Button onClick={() => navigate("/")} m="0" colorScheme='teal'>Home</Button>
      </Box>
      <Grid templateColumns='30% 70%' gap={0} h={'100%'} flex="1" overflow="hidden">
        <Box bg='#adadad' h={'100%'} overflowY={'auto'} p="5" >
          <Heading size="md">Filters</Heading>
          <FilterForm changeHandler={handleChange} />
        </Box>
        <Flex flex='1' flexDirection='column' gap="5" justifyContent='start' bg='#969696' h={'100%'} overflow={'auto'} p="5">
          {state.loading ? <Text>Loading...</Text> : <>{state.cars?.length ? <>{state.cars?.map(car => <Card key={car.id} p="4">
            <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="3">
              <Heading size='sm'>{car.brand} {car.model} - {car.yom}</Heading>
              <Image
                src={car.photo}
                borderRadius='lg'
                h="180px"
                w="250px"
              />
              <Grid gridTemplateColumns="1fr 1fr" w="100%">
                <SingleInfo title="Color" value={car.color} />
                <SingleInfo title="Location" value={car.location} />
                <SingleInfo title="Transmission" value={car.transmission} />
                <SingleInfo title="Fuel" value={car.fuelType} />
                <SingleInfo title="Body type" value={car.bodyType} />
                <SingleInfo title="No. of owners" value={car.noOfOwners} />
                <SingleInfo title="Year of manufacture" value={car.yom} />
                <SingleInfo title="Distance" value={car.kms} />
                <SingleInfo title="Has fitments" value={car.externalFitments ? 'Yes' : 'No'} />
                <SingleInfo title="Insurance validity" value={car.insuranceValidity} />
              </Grid>
            </Flex>
          </Card>)}
          </> :
            <Text>No cars found</Text>}
          </>
          }
        </Flex>
      </Grid>
    </Flex>
  )
}

export default SearchPage