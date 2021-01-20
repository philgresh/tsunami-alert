/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePhone = /* GraphQL */ `
  subscription OnCreatePhone($owner: String!) {
    onCreatePhone(owner: $owner) {
      id
      number
      verificationCode
      verified
      subscribed
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePhone = /* GraphQL */ `
  subscription OnUpdatePhone($owner: String!) {
    onUpdatePhone(owner: $owner) {
      id
      number
      verificationCode
      verified
      subscribed
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePhone = /* GraphQL */ `
  subscription OnDeletePhone($owner: String!) {
    onDeletePhone(owner: $owner) {
      id
      number
      verificationCode
      verified
      subscribed
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateAlert = /* GraphQL */ `
  subscription OnCreateAlert {
    onCreateAlert {
      id
      title
      link
      pubDate
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAlert = /* GraphQL */ `
  subscription OnUpdateAlert {
    onUpdateAlert {
      id
      title
      link
      pubDate
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAlert = /* GraphQL */ `
  subscription OnDeleteAlert {
    onDeleteAlert {
      id
      title
      link
      pubDate
      createdAt
      updatedAt
    }
  }
`;
