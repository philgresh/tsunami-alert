import { API } from "aws-amplify";
import * as mutations from '../../../graphql/mutations';

const todoDetails = {
  name: 'Todo 1',
  description: 'Learn AWS AppSync'
};

const newTodo = await API.graphql({ query: mutations.createTodo, variables: {input: todoDetails}}));