import { useEffect, useState } from 'react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { FormControl, FormLabel, Select, Stack } from '@chakra-ui/react'
import { CAR_BRANDS, CITIES } from '../common/constants'
import { CarFilters } from '../common/types'

type Props = {
  changeHandler: (filters: CarFilters) => void;
}

const FilterForm = ({ changeHandler }: Props) => {
  const [filters, setFilters] = useState<CarFilters>({
    brand: '',
    transmission: 'manual',
    fuelType: 'petrol',
    bodyType: '',
    location: '',
    noOfOwners: '1',
    budget: ''
  })

  function handleChange (e: React.ChangeEvent<HTMLFormElement>): void {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  useEffect(() => {
    changeHandler(filters)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])
  return (
    <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <FormControl>
        <FormLabel>Brand</FormLabel>
        <Select name="brand" value={filters.brand}>
          {CAR_BRANDS.map(({ name }) => <option value={name} key={name}>{name}</option>)}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Select defaultValue="automatic" name="location" value={filters.location}>
          {CITIES.map(city => <option value={city} key={city}>{city}</option>)}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Body type</FormLabel>
        <Select defaultValue="automatic" name="bodyType" value={filters.bodyType}>
          {['Sedan', 'Hatchback', 'SUV'].map(bodyType => <option value={bodyType.toLowerCase()} key={bodyType}>{bodyType}</option>)}
        </Select>
      </FormControl>
      <RadioGroup name="noOfOwners" value={filters.noOfOwners}>
        <FormLabel>No. of owners</FormLabel>
        <Stack direction="column">
          <Radio value='1'>1st owner</Radio>
          <Radio value='2'>2nd owner</Radio>
          <Radio value='3'>3rd owner</Radio>
        </Stack>
      </RadioGroup>
      <RadioGroup name="fuelType" defaultValue="petrol" value={filters.fuelType}>
        <FormLabel>Fuel type</FormLabel>
        <Stack direction="column">
          <Radio value='petrol' >Petrol</Radio>
          <Radio value='diesel'>Diesel</Radio>
          <Radio value='cng'>CNG</Radio>
        </Stack>
      </RadioGroup>
      <RadioGroup name="transmission" defaultValue="automatic" value={filters.transmission}>
        <FormLabel>Transmission</FormLabel>
        <Stack direction="column">
          <Radio value='automatic'>Automatic</Radio>
          <Radio value='manual' >Manual</Radio>
        </Stack>
      </RadioGroup>
    </form>
  )
}

export default FilterForm