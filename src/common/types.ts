export type CarDetails = {
  brand: string,
  color: string,
  yom: string,
  insuranceValidity: string,
  kms: string,
  location: string,
  noOfOwners: string,
  transmission: string,
  externalFitments: string,
  photo: string,
  bodyType: string,
  fuelType: string,
  price: string,
  model: string,
}

export type CarFilters = {
  brand: string
  transmission: string
  fuelType: string
  bodyType: string,
  location: string,
  noOfOwners: string,
  budget: string
}