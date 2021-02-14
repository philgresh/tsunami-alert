/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdatePhone = /* GraphQL */ `
  subscription OnUpdatePhone($owner: String!) {
    onUpdatePhone(owner: $owner) {
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
export const onDeletePhone = /* GraphQL */ `
  subscription OnDeletePhone($owner: String!) {
    onDeletePhone(owner: $owner) {
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
