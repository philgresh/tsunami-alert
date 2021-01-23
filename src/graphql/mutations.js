/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const confirmPhone = /* GraphQL */ `
  mutation ConfirmPhone($verificationCode: String!) {
    confirmPhone(verificationCode: $verificationCode)
  }
`;
export const createPhone = /* GraphQL */ `
  mutation CreatePhone($number: String!) {
    createPhone(number: $number) {
      id
      owner
      number
      verificationCode
      verified
      subscribed
      createdAt
      updatedAt
    }
  }
`;
export const update = /* GraphQL */ `
  mutation Update(
    $input: UpdatePhoneInput!
    $condition: ModelPhoneConditionInput
  ) {
    update(input: $input, condition: $condition) {
      id
      owner
      number
      verificationCode
      verified
      subscribed
      createdAt
      updatedAt
    }
  }
`;
