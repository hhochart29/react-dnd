import { SmallDashOutlined } from '@ant-design/icons'
import { ColumnName } from 'app/contexts/ApiContext/services/missions'
import { Candidate } from 'app/types'
import Loader from 'components/Loader'
import React, { FC } from 'react'
import { Container, Draggable, DragStartCallback, OnDropCallback } from 'react-smooth-dnd'
import Item from '../Item/component'
import styles from './styles.module.scss'

interface OwnProps {
  name: string
  columnName: ColumnName
  icon: React.ReactNode
  candidates: Array<Candidate>
  isLoading?: boolean
  isUpdating?: boolean
  shouldAcceptDrop?: boolean
  onDrop: OnDropCallback
  onDragStart?: DragStartCallback
  onClick: (cdt: Candidate) => void
  canDelete?: boolean
  onDeleteClick?: (cdt: Candidate) => void
}

const Column: FC<OwnProps> = ({
  icon,
  name,
  columnName,
  isLoading,
  isUpdating,
  candidates,
  onDrop,
  onDragStart,
  onClick,
  onDeleteClick,
  canDelete = true,
  shouldAcceptDrop = true,
}) => {
  return (
    <div className={styles.wrapper} data-cy={`mission.column.${columnName}`}>
      <h2>
        {icon} {name}
      </h2>
      {isLoading ? (
        <div data-cy="mission.column.loading">
          <Loader />
        </div>
      ) : (
        <Container
          onDrop={onDrop}
          onDragStart={onDragStart}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview',
          }}
          getChildPayload={(index) => ({
            ...candidates?.[index],
            leavingColName: columnName,
          })}
          groupName={ColumnName[columnName]}
          shouldAcceptDrop={(e) => e.groupName !== ColumnName[ColumnName.RECRUITED]}
          shouldAnimateDrop={(e) => e.groupName !== ColumnName[ColumnName.RECRUITED]}
        >
          {isUpdating && (
            <div className={styles.overlay}>
              <Loader />
            </div>
          )}
          {candidates?.length ? (
            candidates?.map((cdt) => (
              <Draggable key={cdt.id} data-cy="mission.column.item">
                <Item
                  columnName={columnName}
                  candidate={cdt}
                  onClick={() => onClick(cdt)}
                  canDelete={canDelete}
                  onDeleteClick={onDeleteClick ? () => onDeleteClick(cdt) : undefined}
                />
              </Draggable>
            ))
          ) : (
            <div className={styles.dropZone} data-cy="mission.column.empty">
              <div>
                <SmallDashOutlined size={150} />
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  )
}

export default Column
