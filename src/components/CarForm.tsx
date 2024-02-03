import { Input, Button, FormControl, FormLabel, Select, Grid, Center } from "@chakra-ui/react";
import { useState } from "react";
import { CarDetails } from "../common/types";

type Props = {
  brand: string,
  onSubmit: (formValues: CarDetails) => void
}

const Form = (props: Props) => {
  const { brand, onSubmit } = props;
  const [formValues, setFormValues] = useState<CarDetails>({
    brand,
    color: '',
    yom: '',
    insuranceValidity: '',
    kms: '',
    location: '',
    noOfOwners: '',
    transmission: 'automatic',
    externalFitments: 'false',
    photo: '',
    bodyType: '',
    fuelType: '',
    price: '',
    model: '',
  })
  function handleChange (e: React.ChangeEvent<HTMLFormElement>): void {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Grid templateColumns='repeat(2, 1fr)' gap="5" placeItems="center" m="0" >
        <FormControl>
          <FormLabel>Brand</FormLabel>
          <Input required placeholder="Enter brand" defaultValue={brand} disabled />
        </FormControl>
        <FormControl>
          <FormLabel>Model</FormLabel>
          <Input required placeholder="Enter model" name="model" value={formValues.model} />
        </FormControl>
        <FormControl>
          <FormLabel>Color</FormLabel>
          <Input required placeholder="Enter color" name="color" value={formValues.color} />
        </FormControl>
        <FormControl>
          <FormLabel>Year of Manufacture</FormLabel>
          <Input required placeholder="Enter year of manufacture" name="yom" value={formValues.yom} />
        </FormControl>
        <FormControl>
          <FormLabel>Insurance Validity</FormLabel>
          <Input required placeholder="Enter insurance validity" type="date" name="insuranceValidity" value={formValues.insuranceValidity} />
        </FormControl>
        <FormControl>
          <FormLabel>Kilometers</FormLabel>
          <Input required placeholder="Enter kilometers" name="kms" value={formValues.kms} />
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input required placeholder="Enter location" name="location" value={formValues.location} />
        </FormControl>
        <FormControl>
          <FormLabel>Number of Owners</FormLabel>
          <Input required placeholder="Enter number of owners" name="noOfOwners" value={formValues.noOfOwners} />
        </FormControl>
        <FormControl>
          <FormLabel>Transmission</FormLabel>
          <Select defaultValue="automatic" name="transmission" value={formValues.transmission}>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>External Fitments</FormLabel>
          <Select defaultValue="false" name="externalFitments" value={formValues.externalFitments}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Photo</FormLabel>
          <Input required placeholder="Enter photo URL" type="file" name="photo" value={formValues.photo} />
        </FormControl>
        <FormControl>
          <FormLabel>Body Type</FormLabel>
          <Input required placeholder="Enter body type" name="bodyType" value={formValues.bodyType} />
        </FormControl>
        <FormControl>
          <FormLabel>Fuel Type</FormLabel>
          <Input required placeholder="Enter fuel type" name="fuelType" value={formValues.fuelType} />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input required placeholder="Enter price" name="price" value={formValues.price} />
        </FormControl>
      </Grid>
      <Center margin="10px">
        <Button type="submit" colorScheme='teal'>Submit</Button>
      </Center>
    </form>
  );
}

export default Form