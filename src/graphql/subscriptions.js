/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdatePhone = /* GraphQL */ `
  subscription OnUpdatePhone($owner: String!) {
    onUpdatePhone(owner: $owner) {
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
