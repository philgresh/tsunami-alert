/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPhone = /* GraphQL */ `
  query GetPhone($id: ID!) {
    getPhone(id: $id) {
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
export const listPhones = /* GraphQL */ `
  query ListPhones(
    $id: ID
    $filter: ModelPhoneFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPhones(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        owner
        number
        verified
        subscribed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAlert = /* GraphQL */ `
  query GetAlert($id: ID!) {
    getAlert(id: $id) {
      id
      title
      link
      pubDate
      createdAt
      updatedAt
    }
  }
`;
export const listAlerts = /* GraphQL */ `
  query ListAlerts(
    $id: ID
    $filter: ModelAlertFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAlerts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        title
        link
        pubDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
