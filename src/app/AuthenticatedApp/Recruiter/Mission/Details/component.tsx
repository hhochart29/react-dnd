import {
  CalendarOutlined,
  CheckCircleOutlined,
  LikeOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import Applicant from 'app/AuthenticatedApp/components/Drawer/Applicant'
import ModalRecruitCandidate, {
  ModalOpenStateMissionList,
} from 'recruiter/components/Modal/RecruitCandidate'
import SubMenu from 'app/AuthenticatedApp/components/SubMenu'
import { Candidate, Mission } from 'app/types'
import config from 'config'
import React, { FC, useCallback, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { DropResult } from 'react-smooth-dnd'
import { useApi } from 'app/contexts/ApiContext'
import { ColumnName } from 'app/contexts/ApiContext/services/missions'
import RemainingDays from '../components/RemainingDays'
import Column from './Column'
import DeclineFormModal from './DeclineFormModal'
import { CallbackPayload } from './DeclineFormModal/component'
import styles from './styles.module.scss'
import ModalList from 'recruiter/components/Modal/List'
import Modal from 'antd/lib/modal/Modal'
import Details from 'recruiter/JobDescription/Details/component'

/*
@refer: https://github.com/kutlugsahin/smooth-dnd-demo/blob/master/src/demo/pages/cards.js
*/

interface OwnProps {
  mission: Mission
}

const DetailsMission: FC<OwnProps> = ({ mission }) => {
  const { formatMessage, formatDate } = useIntl()
  const { missions } = useApi()

  const {
    data: proposedCandidates = [],
    isLoading: isLoadingProposedCandidates,
  } = missions.useGetMissionProposedCandidates(mission.id)

  const {
    data: interestingCandidates = [],
    isLoading: isLoadingInterestingCandidates,
  } = missions.useGetMissionInterestingCandidates(mission.id)

  const {
    data: meetingCandidates = [],
    isLoading: isLoadingMeetingCandidates,
  } = missions.useGetMissionMeetingCandidates(mission.id)

  const {
    data: recruitedCandidates = [],
    isLoading: isLoadingRecruitedCandidates,
  } = missions.useGetMissionRecruitedCandidates(mission.id)

  const {
    data: declinedCandidates = [],
    isLoading: isLoadingDeclinedCandidates,
  } = missions.useGetMissionDeclinedCandidates(mission.id)

  const [
    mutateUpdateCandidateStatusToProposed,
    { isLoading: isUpdatingCandidateStatusProposed },
  ] = missions.useUpdateCandidateStatusToProposed()

  const [
    mutateUpdateCandidateStatusToInteresting,
    { isLoading: isUpdatingCandidateStatusInteresting },
  ] = missions.useUpdateCandidateStatusToInteresting()
  const [
    mutateUpdateCandidateStatusToMeeting,
    { isLoading: isUpdatingCandidateStatusMeeting },
  ] = missions.useUpdateCandidateStatusToMeeting()

  const applyDrag = useCallback(
    async (_arr: Candidate[], dropResult: DropResult, colName: ColumnName) => {
      const { removedIndex, addedIndex, payload } = dropResult
      if (removedIndex === null && addedIndex === null) return

      if (addedIndex !== null) {
        switch (colName) {
          case ColumnName.PROPOSED:
            return await mutateUpdateCandidateStatusToProposed({
              mission,
              candidate: payload,
            })

          case ColumnName.INTERESTING:
            return await mutateUpdateCandidateStatusToInteresting({
              mission,
              candidate: payload,
            })

          case ColumnName.MEETING:
            return await mutateUpdateCandidateStatusToMeeting({
              mission,
              candidate: payload,
            })
        }
      }
    },
    [
      mission,
      mutateUpdateCandidateStatusToInteresting,
      mutateUpdateCandidateStatusToMeeting,
      mutateUpdateCandidateStatusToProposed,
    ]
  )

  const deleteModal = useRef(null)
  const recoverModal = useRef<HTMLInputElement>(null)

  const [applicant, setApplicant] = useState<Candidate | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [deleteModalPayload, setDeleteModalPayload] = useState<CallbackPayload | null>(null)
  const [recoverModalOpen, setRecoverModalOpen] = useState<boolean>(false)
  const [jobDescriptionModalOpen, setJobDescriptionModalOpen] = useState<boolean>(false)

  const [recruitModalOpen, setRecruitModalOpen] = useState<ModalOpenStateMissionList>({
    open: false,
    candidate: undefined,
    mission: undefined,
    leavingColName: undefined,
  })
  const [lastDraggedColumn, setLastDraggedColumn] = useState<ColumnName | undefined>(undefined)

  return (
    <>
      <div ref={deleteModal}>
        {deleteModalPayload && (
          <DeclineFormModal
            open={deleteModalOpen}
            callbackPayload={deleteModalPayload}
            onCancel={() => setDeleteModalOpen(false)}
          />
        )}
        <SubMenu
          items={[
            {
              href: config.routes.recruiter.mission.list,
              value: formatMessage({ id: 'recruiter.mission.list.breadcrumb' }),
            },
            {
              href: '#',
              value: mission?.name || 'Mission',
            },
          ]}
        />

        <div className={styles.header}>
          <div>
            <div>
              {formatMessage({ id: 'recruiter.mission.details.header.createdAt' })}{' '}
              {formatDate(mission?.createdAt)}
            </div>
            <h1 data-cy="mission.name">{mission?.name}</h1>
            <div className={styles.missionWrapper}>
              <Button data-cy="mission.status">
                {formatMessage({ id: `missionStatus.${mission?.status}` })}
              </Button>
              <Button
                disabled={!mission.jobDescription}
                className={styles.link}
                type="link"
                data-cy="mission.jobDescription"
                onClick={() => setJobDescriptionModalOpen(true)}
              >
                {formatMessage({ id: 'recruiter.mission.details.header.jobDescription' })}
              </Button>
              <Button
                loading={isLoadingDeclinedCandidates}
                disabled={declinedCandidates.length === 0}
                ref={recoverModal}
                className={styles.link}
                type="link"
                data-cy="mission.declined"
                onClick={() => setRecoverModalOpen(true)}
              >
                {formatMessage({ id: 'recruiter.mission.details.header.declinedCandidate' })}
              </Button>
            </div>
          </div>

          <div>
            <div>
              <RemainingDays status={mission.status} endDate={mission.endDate} large={true} />
            </div>
            {/*
            <div className={styles.action}>
              <Button icon={<RedoOutlined />} size="large" shape="round">
                {formatMessage({ id: 'recruiter.mission.details.header.actions.renew' })}
              </Button>
              <Button icon={<StopOutlined />} size="large" shape="round">
                {formatMessage({ id: 'recruiter.mission.details.header.actions.stop' })}
              </Button>
              <Button icon={<PlayCircleOutlined />} size="large" shape="round">
                {formatMessage({ id: 'recruiter.mission.details.header.actions.resume' })}
              </Button>
            </div>
              */}
          </div>
        </div>

        <div className={styles.wrapper}>
          <Row gutter={16}>
            <Col span={6}>
              <Column
                name={formatMessage({ id: 'recruiter.mission.details.columns.reached' })}
                columnName={ColumnName.PROPOSED}
                icon={<PhoneOutlined />}
                candidates={proposedCandidates}
                onDragStart={({ isSource }) =>
                  isSource && setLastDraggedColumn(ColumnName.PROPOSED)
                }
                isLoading={isLoadingProposedCandidates}
                isUpdating={isUpdatingCandidateStatusProposed}
                onDrop={(drop) => applyDrag(proposedCandidates, drop, ColumnName.PROPOSED)}
                onClick={(cdt) => setApplicant(cdt)}
                onDeleteClick={(cdt) => {
                  setDeleteModalPayload({
                    candidate: { ...cdt, leavingColName: ColumnName.PROPOSED },
                    mission,
                  })
                  setDeleteModalOpen(true)
                }}
              />
            </Col>
            <Col span={6}>
              <Column
                name={formatMessage({ id: 'recruiter.mission.details.columns.interesting' })}
                icon={<LikeOutlined />}
                columnName={ColumnName.INTERESTING}
                candidates={interestingCandidates}
                onDragStart={({ isSource }) =>
                  isSource && setLastDraggedColumn(ColumnName.INTERESTING)
                }
                isLoading={isLoadingInterestingCandidates}
                isUpdating={isUpdatingCandidateStatusInteresting}
                onDrop={(drop) => applyDrag(interestingCandidates, drop, ColumnName.INTERESTING)}
                onClick={(cdt) => setApplicant(cdt)}
                onDeleteClick={(cdt) => {
                  setDeleteModalPayload({
                    candidate: { ...cdt, leavingColName: ColumnName.INTERESTING },
                    mission,
                  })
                  setDeleteModalOpen(true)
                }}
              />
            </Col>
            <Col span={6}>
              <Column
                name={formatMessage({ id: 'recruiter.mission.details.columns.planned' })}
                icon={<CalendarOutlined />}
                columnName={ColumnName.MEETING}
                candidates={meetingCandidates}
                isLoading={isLoadingMeetingCandidates}
                onDragStart={({ isSource }) => isSource && setLastDraggedColumn(ColumnName.MEETING)}
                isUpdating={isUpdatingCandidateStatusMeeting}
                onDrop={(drop) => applyDrag(meetingCandidates, drop, ColumnName.MEETING)}
                onClick={(cdt) => setApplicant(cdt)}
                onDeleteClick={(cdt) => {
                  setDeleteModalPayload({
                    candidate: { ...cdt, leavingColName: ColumnName.MEETING },
                    mission,
                  })
                  setDeleteModalOpen(true)
                }}
              />
            </Col>
            <Col span={6}>
              <Column
                name={formatMessage({ id: 'recruiter.mission.details.columns.recruited' })}
                icon={<CheckCircleOutlined />}
                columnName={ColumnName.RECRUITED}
                candidates={recruitedCandidates}
                isLoading={isLoadingRecruitedCandidates}
                onDragStart={({ isSource }) =>
                  isSource && setLastDraggedColumn(ColumnName.RECRUITED)
                }
                shouldAcceptDrop={false}
                onDrop={(drop) => {
                  if (drop.addedIndex !== null && drop.removedIndex === null) {
                    setRecruitModalOpen({
                      ...recruitModalOpen,
                      open: true,
                      candidate: drop.payload,
                      mission: mission,
                      leavingColName: lastDraggedColumn,
                    })
                  }
                }}
                onClick={(cdt) => setApplicant(cdt)}
                canDelete={false}
              />
            </Col>
          </Row>
        </div>
      </div>
      <ModalRecruitCandidate setModalOpen={setRecruitModalOpen} modalOpen={recruitModalOpen} />
      {applicant && (
        <Applicant context="missions" applicant={applicant} onClose={() => setApplicant(null)} />
      )}
      <Modal
        visible={jobDescriptionModalOpen}
        onCancel={() => setJobDescriptionModalOpen(false)}
        footer={null}
        width={'60%'}
        className={styles.jobDescriptionModal}
      >
        <Details jobDescription={mission.jobDescription} showBreadcrumb={false} />
      </Modal>
      <ModalList
        setModalOpen={setRecoverModalOpen}
        modalOpen={recoverModalOpen}
        refEl={recoverModal}
        className={styles.modalList}
      >
        {declinedCandidates.map((candidate) => {
          return (
            <p key={candidate.id}>
              {`${candidate.firstname} ${candidate.lastname}`}{' '}
              <Button
                className={styles.link}
                type="link"
                data-cy={`declined-${candidate.firstname}-${candidate.lastname}`}
                onClick={() => {
                  mutateUpdateCandidateStatusToProposed({
                    mission,
                    candidate: {
                      ...candidate,
                      leavingColName: ColumnName.DECLINED,
                    },
                  })
                  setRecoverModalOpen(false)
                }}
              >
                {formatMessage({ id: 'recruiter.mission.details.recover.restore' })}
              </Button>
            </p>
          )
        })}
        <div className={styles.cancel}>
          <Button className={styles.link} type="link" onClick={() => setRecoverModalOpen(false)}>
            {formatMessage({ id: 'recruiter.mission.details.recover.cancel' })}
          </Button>
        </div>
      </ModalList>
    </>
  )
}

export default DetailsMission
