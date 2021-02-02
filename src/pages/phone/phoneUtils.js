import * as Yup from 'yup';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

const US_COUNTRY_CODE_PREFIX = '+1';

const stripExceptNums = (value) => value.replace(/\D/g, '');

const addCountryCode = (value) => `${US_COUNTRY_CODE_PREFIX}${value}`;

const matchesBasicRegex = /^\+1[2-9]{1}\d{2}[2-9]{1}\d{2}[0-9]{4}/g;

export const cleanNumber = (value) => {
  const newVal = stripExceptNums(value);
  return addCountryCode(newVal);
};

export const phoneSchema = Yup.object().shape({
  number: Yup.string()
    .required('Required')
    .transform(cleanNumber)
    .length(12, 'Incorrect length!')
    .matches(matchesBasicRegex, "Doesn't pass basic regexing"),
});

export const createPhone = async (number) =>
  API.graphql(graphqlOperation(mutations.createPhone, { number }))
    .then(({ data }) => data.createPhone)
    .catch((err) => {
      console.error({ err });
      return err;
    });

export const confirmPhone = async (number, verificationCode) =>
  API.graphql(
    graphqlOperation(mutations.confirmPhone, { number, verificationCode }),
  );

export const onSubmit = async (values, actions) => {
  const newNum = cleanNumber(values.number);

  const result = await createPhone(newNum);
  console.log({ result });
  if (result) {
    actions.setSubmitting(true);
  }
};
