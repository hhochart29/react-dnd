import { CheckOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useApi } from 'app/contexts/ApiContext'
import { ColumnName } from 'app/contexts/ApiContext/services/missions'
import InputText from 'app/form/base/InputText'
import { Candidate, Mission } from 'app/types'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './styles.module.scss'

export interface CallbackPayload {
  candidate: Candidate & { leavingColName: ColumnName }
  mission: Mission
}

interface OwnProps {
  callbackPayload: CallbackPayload
  onCancel: () => void
  open: boolean
}

const DeclineForm: React.FC<OwnProps> = ({ callbackPayload, onCancel, open }) => {
  const { missions } = useApi()

  const [
    mutateUpdateCandidateStatusToDeclined,
    { isLoading },
  ] = missions.useUpdateCandidateStatusToDeclined()

  const [declineReason, setDeclineReason] = useState<string>('')

  return (
    <Modal
      className={styles.modal}
      onCancel={onCancel}
      width={530}
      maskClosable={true}
      closeIcon={<></>}
      footer={<></>}
      visible={open}
      onOk={onCancel}
    >
      <div className={styles.form}>
        <>
          <div>
            <h1>
              <FormattedMessage id="recruiter.mission.details.modal.title" />
            </h1>
          </div>
          <p>
            <FormattedMessage id="recruiter.mission.details.modal.description" />
          </p>
          <InputText
            label="Motif du refus"
            name="declineReason"
            data-cy="declineReason"
            onChange={(e) => setDeclineReason(e.target.value)}
          />
          <div className={styles.buttonsWrapper}>
            <Button type="link" className={styles.underline} onClick={onCancel}>
              <FormattedMessage id="recruiter.mission.details.modal.cancel" />
            </Button>
            <Button
              icon={<CheckOutlined />}
              shape="round"
              disabled={isLoading}
              loading={isLoading}
              size="large"
              data-cy="submit"
              onClick={async () => {
                if (callbackPayload) {
                  await mutateUpdateCandidateStatusToDeclined({
                    ...callbackPayload,
                    declineReason,
                  })
                  onCancel()
                }
              }}
            >
              <FormattedMessage id="recruiter.mission.details.modal.validate" />
            </Button>
          </div>
        </>
      </div>
    </Modal>
  )
}

export default DeclineForm
