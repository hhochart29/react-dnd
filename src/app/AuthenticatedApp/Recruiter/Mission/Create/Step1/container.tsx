import React, { FC, Dispatch, SetStateAction } from 'react'
import Step1 from './component'
import { useApi } from 'app/contexts/ApiContext'
import { FormSteps } from '../container'

interface OwnProps {
  setFormStep: Dispatch<SetStateAction<FormSteps>>
}

const Step1Container: FC<OwnProps> = ({ setFormStep }) => {
  const { jobDescription } = useApi()
  const {
    isLoading: loadingJobDescription,
    data: jobDescriptionsList,
  } = jobDescription.useJobDescriptionList()

  return (
    <Step1
      loadingJobDescription={loadingJobDescription}
      jobDescriptionsList={jobDescriptionsList}
      setFormStep={setFormStep}
    />
  )
}

export default Step1Container
