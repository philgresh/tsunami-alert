import * as Yup from 'yup';

const phoneSchema = Yup.object().shape({
  number: Yup.string().length(9, 'Incorrect length!').required('Required'),
});

export default phoneSchema;
