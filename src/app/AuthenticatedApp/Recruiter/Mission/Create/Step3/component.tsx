import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import styles from './styles.module.scss'
import { Button } from 'antd'
import { navigate } from '@reach/router'
import config from 'config'
import { FlagOutlined, CheckOutlined } from '@ant-design/icons'

const Step3: FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <h2>{formatMessage({ id: 'recruiter.mission.create.tabs.confirm.title' })}</h2>
      <p className={styles.description}>
        <CheckOutlined />{' '}
        {formatMessage({ id: 'recruiter.mission.create.tabs.confirm.description' })}
      </p>
      <Button
        className={styles.button}
        icon={<FlagOutlined />}
        onClick={() => {
          navigate(config.routes.recruiter.mission.list)
        }}
        size="large"
        type="default"
        shape="round"
      >
        {formatMessage({ id: 'recruiter.mission.create.tabs.confirm.button' })}
      </Button>
    </>
  )
}

export default Step3
