import { Mission } from 'app/types'
import cn from 'classnames'
import moment from 'moment'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import styles from './styles.module.scss'

interface OwnProps {
  status?: Mission['status']
  endDate: string
  large?: boolean
}

export const daysCount = (endDate: string): number => moment(endDate).diff(Date.now(), 'days')

const RemainingDays: React.FC<OwnProps> = ({ status, endDate, large = false }) => {
  const { formatMessage } = useIntl()

  const days = useMemo(() => {
    return daysCount(endDate)
  }, [endDate])

  return (
    <div className={cn(styles.timeLeft, large ? styles.timeLeftLarge : styles.timeLeftSmall)}>
      {status === 'pending' ? (
        <div>
          <span>{formatMessage({ id: 'recruiter.mission.remainingDays.statusPending' })}</span>
        </div>
      ) : days < 1 ? (
        <div>
          <span>{formatMessage({ id: 'recruiter.mission.remainingDays.timeOver' })}</span>
        </div>
      ) : (
        <>
          <div>
            {[...days.toString()].map((number, key) => (
              <span key={key}>{number}</span>
            ))}
          </div>
          <p>{formatMessage({ id: 'recruiter.mission.remainingDays.legend' })}</p>
        </>
      )}
    </div>
  )
}

export default RemainingDays
