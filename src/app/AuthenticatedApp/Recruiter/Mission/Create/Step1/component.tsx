import { CheckOutlined, FileOutlined } from '@ant-design/icons'
import { navigate } from '@reach/router'
import { Button } from 'antd'
import ErrorMessage from 'app/form/base/ErrorMessage'
import InputNumber from 'app/form/base/InputNumber'
import InputText from 'app/form/base/InputText'
import { JobDescription } from 'app/types'
import config from 'config'
import { FormikValues, useFormikContext } from 'formik'
import React, { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import ModalList from 'recruiter/components/Modal/List'
import { FormSteps } from '../container'
import { missionCreateStep1 } from '../validation'
import styles from './styles.module.scss'

interface OwnProps {
  loadingJobDescription: boolean
  jobDescriptionsList?: JobDescription[]
  setFormStep: Dispatch<SetStateAction<FormSteps>>
}

const Step1: FC<OwnProps> = ({ loadingJobDescription, jobDescriptionsList, setFormStep }) => {
  const { formatMessage, formatDate } = useIntl()

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const buttonEl = useRef<HTMLInputElement>(null)

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
    setTouched,
    setValues,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext<FormikValues>()

  return (
    <>
      <h2>{formatMessage({ id: 'recruiter.mission.create.tabs.mission.title' })}</h2>
      <h3>{formatMessage({ id: 'recruiter.mission.create.tabs.mission.subtitle' })}</h3>
      <div className={styles.formWrapper}>
        <div>
          <InputText
            label={formatMessage({ id: 'recruiter.mission.create.tabs.mission.form.name.title' })}
            placeholder={formatMessage({
              id: 'recruiter.mission.create.tabs.mission.form.name.placeholder',
            })}
            name="name"
            id="name"
            data-cy="mission.name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && errors.name}
          />
        </div>
        <div>
          <InputNumber
            label={formatMessage({
              id: 'recruiter.mission.create.tabs.mission.form.profileCount.title',
            })}
            placeholder={formatMessage({
              id: 'recruiter.mission.create.tabs.mission.form.profileCount.placeholder',
            })}
            name="profileCount"
            id="profileCount"
            data-cy="mission.profileCount"
            value={values.profileCount}
            onChange={(v) =>
              Number.isInteger(v as number) && setValues({ ...values, profileCount: v as number })
            }
            error={touched.profileCount && errors.profileCount}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <p>
            {formatMessage({
              id: 'recruiter.mission.create.tabs.mission.form.jobDescription.title',
            })}
          </p>
          <div>
            <Button
              icon={<FileOutlined />}
              onClick={() => {
                setModalOpen(true)
                setFieldTouched('jobDescription', true)
              }}
              {...(touched.jobDescription && errors.jobDescription
                ? { danger: true }
                : { className: styles.button })}
              type="default"
              disabled={loadingJobDescription}
              loading={loadingJobDescription}
              data-cy="mission.jobDescription"
              shape="round"
              ref={buttonEl}
            >
              {values.jobDescription
                ? jobDescriptionsList?.find(({ id }) => values.jobDescription.includes(id))?.name
                : formatMessage({
                    id: 'recruiter.mission.create.tabs.mission.form.jobDescription.placeholder',
                  })}
            </Button>
            <Button
              icon={<FileOutlined />}
              type="text"
              shape="round"
              ghost
              className={styles.button}
              onClick={() =>
                navigate(config.routes.recruiter.jobDescription.create, {
                  state: {
                    goBack: config.routes.recruiter.mission.create,
                  },
                })
              }
            >
              {formatMessage({
                id: 'recruiter.mission.create.tabs.mission.form.jobDescription.create',
              })}
            </Button>
          </div>
          {touched.jobDescription && errors.jobDescription && (
            <ErrorMessage name="jobDescription" />
          )}
        </div>
        <div className={styles.submitWrapper}>
          <Button
            icon={<CheckOutlined />}
            onClick={async () => {
              try {
                await missionCreateStep1(formatMessage).validate(values)
                setErrors({})
                setTouched({})
                setFormStep(FormSteps.SECOND)
              } catch {
                handleSubmit()
              }
            }}
            data-cy="mission.step1"
            size="large"
            type="default"
            shape="round"
          >
            {formatMessage({ id: 'recruiter.mission.create.tabs.mission.form.submit' })}
          </Button>
        </div>
      </div>
      <ModalList setModalOpen={setModalOpen} modalOpen={modalOpen} refEl={buttonEl}>
        {jobDescriptionsList?.map(({ name, id, createdAt }) => (
          <p
            key={id}
            onClick={() => {
              setFieldValue('jobDescription', `/api/job_descriptions/${id}`)
              setModalOpen(false)
            }}
          >
            {name}, {formatDate(new Date(createdAt))}
          </p>
        ))}
      </ModalList>
    </>
  )
}

export default Step1
