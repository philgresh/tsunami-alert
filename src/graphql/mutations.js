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
export const update = /* GraphQL */ `
  mutation Update(
    $input: UpdatePhoneInput!
    $condition: ModelPhoneConditionInput
  ) {
    update(input: $input, condition: $condition) {
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
export const delete = /* GraphQL */ `
  mutation Delete(
    $input: DeletePhoneInput!
    $condition: ModelPhoneConditionInput
  ) {
    delete(input: $input, condition: $condition) {
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
