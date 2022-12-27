import React, { FC, Dispatch, SetStateAction } from 'react'
import { Steps } from 'antd'
import styles from './styles.module.scss'
import { useIntl } from 'react-intl'
import SubMenu from 'app/AuthenticatedApp/components/SubMenu'
import config from 'config'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { FormSteps } from './container'

interface OwnProps {
  setFormStep: Dispatch<SetStateAction<FormSteps>>
  formStep: FormSteps
  submitting: boolean
}

const MissionCreate: FC<OwnProps> = ({ formStep, setFormStep, submitting }) => {
  const { formatMessage } = useIntl()

  function renderForm(): React.ReactElement {
    switch (formStep) {
      case FormSteps.FIRST:
        return <Step1 setFormStep={setFormStep} />

      case FormSteps.SECOND:
        return <Step2 submitting={submitting} />

      case FormSteps.THIRD:
        return <Step3 />
    }
  }

  return (
    <div className={styles.pageBackground}>
      <SubMenu
        items={[
          {
            href: config.routes.recruiter.mission.list,
            value: formatMessage({ id: 'recruiter.mission.list.breadcrumb' }),
          },
          {
            href: config.routes.recruiter.mission.create,
            value: formatMessage({ id: 'recruiter.mission.create.breadcrumb' }),
          },
        ]}
      />
      <div className={styles.stepsContainer}>
        <Steps
          direction="vertical"
          current={Object.keys(FormSteps).indexOf(formStep.toString())}
          className={styles.steps}
          progressDot
          size="small"
          onChange={(i) => {
            setFormStep(i)
          }}
        >
          <Steps.Step
            disabled={formStep === FormSteps.THIRD}
            description={formatMessage({ id: 'recruiter.mission.create.tabs.mission.title' })}
          />
          <Steps.Step
            disabled={formStep === FormSteps.FIRST || formStep === FormSteps.THIRD}
            description={formatMessage({
              id: 'recruiter.mission.create.tabs.offerValidation.title',
            })}
          />
          <Steps.Step
            disabled={formStep === FormSteps.FIRST || formStep === FormSteps.SECOND}
            description={formatMessage({ id: 'recruiter.mission.create.tabs.confirm.title' })}
          />
        </Steps>
        <div>{renderForm()}</div>
      </div>
    </div>
  )
}

export default MissionCreate
