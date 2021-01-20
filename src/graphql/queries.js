/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPhone = /* GraphQL */ `
  query GetPhone($id: ID!) {
    getPhone(id: $id) {
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
export const listPhones = /* GraphQL */ `
  query ListPhones(
    $filter: ModelPhoneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhones(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        number
        verificationCode
        verified
        subscribed
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getAlert = /* GraphQL */ `
  query GetAlert($pubDate: AWSDateTime!) {
    getAlert(pubDate: $pubDate) {
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
    $pubDate: AWSDateTime
    $filter: ModelAlertFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAlerts(
      pubDate: $pubDate
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
