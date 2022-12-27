import * as Yup from 'yup'

export const missionCreateStep1 = (formatMessage: Function): Yup.ObjectSchema =>
  Yup.object().shape({
    name: Yup.string().required(formatMessage({ id: 'validation.field.required' })),
    profileCount: Yup.number()
      .required(formatMessage({ id: 'validation.field.required' }))
      .moreThan(0),
    jobDescription: Yup.string()
      .required(formatMessage({ id: 'validation.field.required' }))
      .nullable(),
  })

export const missionCreateStep2 = (formatMessage: Function): Yup.ObjectSchema =>
  Yup.object().shape({
    consent: Yup.boolean().oneOf([true], formatMessage({ id: 'validation.field.required' })),
  })

export const validationSchema = (formatMessage: Function): Yup.ObjectSchema =>
  missionCreateStep1(formatMessage).concat(missionCreateStep2(formatMessage))
