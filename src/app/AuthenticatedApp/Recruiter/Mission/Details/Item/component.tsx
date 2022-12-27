import { DeleteOutlined } from '@ant-design/icons'
import { Rate } from 'antd'
import Avatar from 'app/AuthenticatedApp/components/Avatar'
import Bullet from 'app/AuthenticatedApp/Recruiter/components/Bullet'
import { ColumnName } from 'app/contexts/ApiContext/services/missions'
import { Candidate } from 'app/types'
import React, { FC, MouseEvent } from 'react'
import { useIntl } from 'react-intl'
import styles from './styles.module.scss'

interface OwnProps {
  candidate: Candidate
  onClick: (event: MouseEvent<HTMLDivElement>) => void
  onDeleteClick?: (event: MouseEvent<HTMLDivElement>) => void
  canDelete: boolean
  columnName: ColumnName
}

const Item: FC<OwnProps> = ({ candidate, onDeleteClick, canDelete, columnName, ...restProps }) => {
  const { formatDate, formatMessage } = useIntl()

  return (
    <div
      className={styles.wrapper}
      {...restProps}
      data-cy={`mission.column.item.${candidate.firstname}-${candidate.lastname}`}
    >
      <div className={styles.information}>
        <div className={styles.userWrapper}>
          <Avatar
            className={styles.avatar}
            size={36}
            firstname={candidate.firstname}
            lastname={candidate.lastname}
          />
          <div className={styles.userInformation}>
            <p>{`${candidate.firstname} ${candidate.lastname}`}</p>
            <span>
              {candidate?.statusChangedAt &&
                formatMessage({
                  id: `recruiter.mission.details.item.${ColumnName[columnName]}.prefixDate`,
                }) +
                  ' ' +
                  formatDate(candidate?.statusChangedAt)}
            </span>
          </div>
        </div>
        <div className={styles.note}>
          <p>Note</p>
          <div className={styles.bulletWrapper}>
            <Rate
              value={(candidate.score || 0) / 2}
              character={() => <Bullet size={12} />}
              allowHalf={true}
              disabled={true}
            />
          </div>
        </div>
      </div>
      {canDelete && (
        <DeleteOutlined
          className={styles.delete}
          color="#ACACAC"
          data-cy={`mission.column.item.${candidate.firstname}-${candidate.lastname}.delete`}
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault()
            e.stopPropagation()
            if (onDeleteClick) onDeleteClick(e)
          }}
        />
      )}
    </div>
  )
}

export default Item
