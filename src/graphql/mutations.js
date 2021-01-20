/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPhone = /* GraphQL */ `
  mutation CreatePhone(
    $input: CreatePhoneInput!
    $condition: ModelPhoneConditionInput
  ) {
    createPhone(input: $input, condition: $condition) {
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
export const updatePhone = /* GraphQL */ `
  mutation UpdatePhone(
    $input: UpdatePhoneInput!
    $condition: ModelPhoneConditionInput
  ) {
    updatePhone(input: $input, condition: $condition) {
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
export const deletePhone = /* GraphQL */ `
  mutation DeletePhone(
    $input: DeletePhoneInput!
    $condition: ModelPhoneConditionInput
  ) {
    deletePhone(input: $input, condition: $condition) {
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
export const createAlert = /* GraphQL */ `
  mutation CreateAlert(
    $input: CreateAlertInput!
    $condition: ModelAlertConditionInput
  ) {
    createAlert(input: $input, condition: $condition) {
      id
      title
      link
      pubDate
      createdAt
      updatedAt
    }
  }
`;
export const updateAlert = /* GraphQL */ `
  mutation UpdateAlert(
    $input: UpdateAlertInput!
    $condition: ModelAlertConditionInput
  ) {
    updateAlert(input: $input, condition: $condition) {
      id
      title
      link
      pubDate
      createdAt
      updatedAt
    }
  }
`;
export const deleteAlert = /* GraphQL */ `
  mutation DeleteAlert(
    $input: DeleteAlertInput!
    $condition: ModelAlertConditionInput
  ) {
    deleteAlert(input: $input, condition: $condition) {
      id
      title
      link
      pubDate
      createdAt
      updatedAt
    }
  }
`;
