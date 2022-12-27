import { Button } from 'antd'
import Checkbox from 'app/form/base/Checkbox'
import ErrorMessage from 'app/form/base/ErrorMessage'
import config from 'config'
import { FormikValues, useFormikContext } from 'formik'
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import { missionCreateStep2 } from '../validation'
import Aside from '../../components/Aside'
import styles from './styles.module.scss'

interface OwnProps {
  submitting: boolean
}

const Step2: FC<OwnProps> = ({ submitting }) => {
  const { formatMessage } = useIntl()

  const {
    values,
    touched,
    errors,
    handleSubmit,
    setErrors,
    setTouched,
    setFieldValue,
  } = useFormikContext<FormikValues>()

  return (
    <>
      <h2>{formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.title' })}</h2>
      <h3>{formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.subtitle' })}</h3>
      <div className={styles.page}>
        <div className={styles.children}>
          <h1 className={styles.info}>
            {formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.info.title' })}{' '}
          </h1>
          <p>
            {formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.info.firstText' })}
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: formatMessage({
                id: 'recruiter.mission.create.tabs.offerValidation.info.content',
              }),
            }}
          />
          <div>
            <Checkbox
              name="conditions"
              data-cy="mission.conditions"
              checked={values.consent}
              onChange={(v) => setFieldValue('consent', v.target.checked)}
            >
              {formatMessage({
                id: 'recruiter.mission.create.tabs.offerValidation.info.conditions',
              })}{' '}
              <a
                className={styles.link}
                href={config.routes.cgv}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.info.cgv' })}
              </a>
            </Checkbox>
            {touched.consent && errors.consent && <ErrorMessage name="consent" />}
          </div>
          <div className={styles.submitWrapper}>
            <Button
              disabled={submitting}
              loading={submitting}
              data-cy="mission.step2"
              onClick={async () => {
                try {
                  await missionCreateStep2(formatMessage).validate(values)
                  setErrors({})
                  setTouched({})
                  handleSubmit()
                } catch {
                  handleSubmit()
                }
              }}
              size="large"
              type="default"
              shape="round"
            >
              {formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.info.submit' })}
            </Button>
          </div>
        </div>
        <Aside
          messages={[
            formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.aside.a' }),
            formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.aside.b' }),
            formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.aside.c' }),
            formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.aside.d' }),
            formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.aside.e' }),
            formatMessage({ id: 'recruiter.mission.create.tabs.offerValidation.aside.f' }),
          ]}
        />
      </div>
    </>
  )
}

export default Step2
