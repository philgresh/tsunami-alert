/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const confirmPhone = /* GraphQL */ `
  mutation ConfirmPhone($number: String!, $verificationCode: String!) {
    confirmPhone(number: $number, verificationCode: $verificationCode) {
      id
      owner
      number
      verified
      subscribed
      createdAt
      updatedAt
    }
  }
`;
export const createPhone = /* GraphQL */ `
  mutation CreatePhone($number: String!) {
    createPhone(number: $number) {
      id
      owner
      number
      verified
      subscribed
      createdAt
      updatedAt
    }
  }
`;
export const updatePhone = /* GraphQL */ `
  mutation UpdatePhone(
    $input: UpdatePhoneInput!
    $condition: ModelPhoneConditionInput
  ) {
    updatePhone(input: $input, condition: $condition) {
      id
      owner
      number
      verified
      subscribed
      createdAt
      updatedAt
    }
  }
`;
export const deletePhone = /* GraphQL */ `
  mutation DeletePhone(
    $input: DeletePhoneInput!
    $condition: ModelPhoneConditionInput
  ) {
    deletePhone(input: $input, condition: $condition) {
      id
      owner
      number
      verified
      subscribed
      createdAt
      updatedAt
    }
  }
`;
