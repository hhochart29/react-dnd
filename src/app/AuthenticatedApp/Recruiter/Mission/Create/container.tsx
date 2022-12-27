import React, { FC, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Formik } from 'formik'
import MissionCreate from './component'
import { useIntl } from 'react-intl'
import { validationSchema } from './validation'
import { useApi } from 'app/contexts/ApiContext'
import { notification } from 'antd'

export enum FormSteps {
  FIRST,
  SECOND,
  THIRD,
}

const MissionCreateContainer: FC<RouteComponentProps> = () => {
  const { formatMessage } = useIntl()
  const { missions } = useApi()

  const [formStep, setFormStep] = useState<FormSteps>(FormSteps.FIRST)

  const initialValues = {
    name: '',
    profileCount: 1,
    jobDescription: null,
    consent: false,
  }
  const [mutateCreateMission, { isLoading: submitting }] = missions.useCreateMission()

  return (
    <Formik
      onSubmit={async (values) => {
        try {
          await mutateCreateMission(values)
          setFormStep(FormSteps.THIRD)
        } catch {
          notification.open({
            message: formatMessage({ id: 'recruiter.mission.create.error.title' }),
            description: formatMessage({ id: 'recruiter.mission.create.error.description' }),
            type: 'error',
          })
        }
      }}
      initialValues={initialValues}
      validationSchema={validationSchema(formatMessage)}
    >
      <MissionCreate formStep={formStep} setFormStep={setFormStep} submitting={submitting} />
    </Formik>
  )
}

export default MissionCreateContainer
