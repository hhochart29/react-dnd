import { FormValues } from 'app/AuthenticatedApp/Recruiter/Mission/Create/types'
import { FormValues as RecruiteRequestForm } from 'app/AuthenticatedApp/Recruiter/components/Modal/RecruitCandidate/types'
import { Candidate, Mission } from 'app/types'
import config from 'config'
import { MutationResultPair, queryCache, QueryResult, useMutation, useQuery } from 'react-query'
import { callAuthenticatedApi } from '../utils'
import { ModalOpenStateProps } from 'app/AuthenticatedApp/Recruiter/components/Modal/RecruitCandidate'

type CreateMissionRequest = FormValues
type CreateMissionResponse = Mission

export enum ColumnName {
  PROPOSED,
  INTERESTING,
  MEETING,
  RECRUITED,
  DECLINED,
}

export const invalidateQueriesMap = new Map<ColumnName, string>([
  [ColumnName.PROPOSED, 'missionCandidatesProposed'],
  [ColumnName.INTERESTING, 'missionCandidatesInteresting'],
  [ColumnName.MEETING, 'missionCandidatesMeeting'],
  [ColumnName.RECRUITED, 'missionCandidatesRecruited'],
  [ColumnName.DECLINED, 'missionCandidatesDeclined'],
])

export const useCreateMission = (): MutationResultPair<
  CreateMissionResponse,
  Error,
  CreateMissionRequest,
  string
> => {
  return useMutation(
    async (payload: CreateMissionRequest) => {
      const { data } = await callAuthenticatedApi<CreateMissionResponse>(
        config.api.missions.create,
        {
          method: 'POST',
          data: payload,
        }
      )
      return data
    },
    {
      throwOnError: true,
    }
  )
}

export const useListMissions = (filters: object = {}): QueryResult<Mission[]> => {
  return useQuery<Mission[], Error>('missions', async () => {
    const { data } = await callAuthenticatedApi<Mission[]>(config.api.missions.get, {
      params: filters,
    })
    return data
  })
}

export const useGetMission = (id: string): QueryResult<Mission> => {
  return useQuery<Mission, Error>(['mission', { id }], async () => {
    const { data } = await callAuthenticatedApi<Mission>(`${config.api.missions.get}/${id}`)
    return data
  })
}

export const useGetMissionInterestingCandidates = (id: string): QueryResult<Candidate[]> => {
  return useQuery<Candidate[], Error>(['missionCandidatesInteresting', { id }], async () => {
    const { data } = await callAuthenticatedApi<Candidate[]>(
      `${config.api.missions.get}/${id}/${config.api.missions.interestingCandidatesSuffix}`
    )

    return data
  })
}

export const useGetMissionCandidates = (id: string): QueryResult<Candidate[]> => {
  return useQuery<Candidate[], Error>(['missionCandidates', { id }], async () => {
    const { data } = await callAuthenticatedApi<Candidate[]>(
      `${config.api.missions.get}/${id}/candidates`
    )
    return data
  })
}

export const useGetMissionMeetingCandidates = (id: string): QueryResult<Candidate[]> => {
  return useQuery<Candidate[], Error>(['missionCandidatesMeeting', { id }], async () => {
    const { data } = await callAuthenticatedApi<Candidate[]>(
      `${config.api.missions.get}/${id}/${config.api.missions.meetingCandidatesSuffix}`
    )

    return data
  })
}

export const useGetMissionProposedCandidates = (id: string): QueryResult<Candidate[]> => {
  return useQuery<Candidate[], Error>(['missionCandidatesProposed', { id }], async () => {
    const { data } = await callAuthenticatedApi<Candidate[]>(
      `${config.api.missions.get}/${id}/${config.api.missions.proposedCandidatesSuffix}`
    )

    return data
  })
}

export const useGetMissionRecruitedCandidates = (id: string): QueryResult<Candidate[]> => {
  return useQuery<Candidate[], Error>(['missionCandidatesRecruited', { id }], async () => {
    const { data } = await callAuthenticatedApi<Candidate[]>(
      `${config.api.missions.get}/${id}/${config.api.missions.recruitedCandidatesSuffix}`
    )

    return data
  })
}

export const useGetMissionDeclinedCandidates = (id: string): QueryResult<Candidate[]> => {
  return useQuery<Candidate[], Error>(['missionCandidatesDeclined', { id }], async () => {
    const { data } = await callAuthenticatedApi<Candidate[]>(
      `${config.api.missions.get}/${id}/${config.api.missions.declinedCandidatesSuffix}`
    )

    return data
  })
}

interface UpdateCandidateRequest {
  mission: Mission
  candidate: Candidate & { leavingColName: ColumnName }
}

interface UpdateCandidateResponse {
  candidate: string
  id: string
  mission: string
  recruiter: string
  status: string
}

export const useUpdateCandidateStatusToMeeting = (): MutationResultPair<
  UpdateCandidateResponse,
  Error,
  UpdateCandidateRequest,
  () => void
> => {
  return useMutation(
    async (payload) => {
      const { data } = await callAuthenticatedApi<UpdateCandidateResponse>(
        config.api.missions.updateCandidateStatusToMeeting,
        { method: 'POST', data: { candidate: payload.candidate.id, mission: payload.mission.id } }
      )

      return data
    },
    {
      throwOnError: true,
      onMutate: ({ mission, candidate }) =>
        handleMutateColumnChange({ mission, candidate }, ColumnName.MEETING),
      onError: (err, _, rollback: () => void) => rollback(),
      onSettled: (p) =>
        queryCache.invalidateQueries([
          invalidateQueriesMap.get(ColumnName.MEETING) as string,
          { id: p?.mission.split('/').pop() },
        ]),
    }
  )
}

export const useUpdateCandidateStatusToInteresting = (): MutationResultPair<
  UpdateCandidateResponse,
  Error,
  UpdateCandidateRequest,
  () => void
> => {
  return useMutation(
    async (payload) => {
      const { data } = await callAuthenticatedApi<UpdateCandidateResponse>(
        config.api.missions.updateCandidateStatusToInteresting,
        { method: 'POST', data: { candidate: payload.candidate.id, mission: payload.mission.id } }
      )

      return data
    },
    {
      throwOnError: true,
      onMutate: ({ mission, candidate }) =>
        handleMutateColumnChange({ mission, candidate }, ColumnName.INTERESTING),
      onError: (err, _, rollback: () => void) => rollback(),
      onSettled: (p) =>
        queryCache.invalidateQueries([
          invalidateQueriesMap.get(ColumnName.INTERESTING) as string,
          { id: p?.mission.split('/').pop() },
        ]),
    }
  )
}

export const useUpdateCandidateStatusToProposed = (): MutationResultPair<
  UpdateCandidateResponse,
  Error,
  UpdateCandidateRequest,
  () => void
> => {
  return useMutation(
    async (payload) => {
      const { data } = await callAuthenticatedApi<UpdateCandidateResponse>(
        config.api.missions.updateCandidateStatusToProposed,
        { method: 'POST', data: { candidate: payload.candidate.id, mission: payload.mission.id } }
      )

      return data
    },
    {
      throwOnError: true,
      onMutate: ({ mission, candidate }) =>
        handleMutateColumnChange({ mission, candidate }, ColumnName.PROPOSED),
      onError: (err, _, rollback: () => void) => rollback(),
      onSettled: (p) =>
        queryCache.invalidateQueries([
          invalidateQueriesMap.get(ColumnName.PROPOSED) as string,
          { id: p?.mission.split('/').pop() },
        ]),
    }
  )
}

type DeclineRequest = UpdateCandidateRequest & { declineReason: string }
export const useUpdateCandidateStatusToDeclined = (): MutationResultPair<
  UpdateCandidateResponse,
  Error,
  DeclineRequest,
  () => void
> => {
  return useMutation(
    async (payload) => {
      const { data } = await callAuthenticatedApi<UpdateCandidateResponse>(
        config.api.missions.updateCandidateStatusToDeclined,
        {
          method: 'POST',
          data: {
            candidate: payload.candidate.id,
            mission: payload.mission.id,
            declineReason: payload.declineReason,
          },
        }
      )

      return data
    },
    {
      throwOnError: true,
      onMutate: ({ mission, candidate }) =>
        handleMutateColumnChange({ mission, candidate }, ColumnName.DECLINED),
      onError: (err, _, rollback: () => void) => rollback(),
    }
  )
}

type RecruiteRequest = RecruiteRequestForm & {
  context: ModalOpenStateProps
}
export const useUpdateCandidateStatusToRecruited = (): MutationResultPair<
  UpdateCandidateResponse,
  Error,
  RecruiteRequest,
  () => void
> => {
  return useMutation(
    async ({ context, ...payload }) => {
      const { data } = await callAuthenticatedApi<UpdateCandidateResponse>(
        config.api.missions.updateCandidateStatusToRecruited,
        { method: 'POST', data: payload }
      )
      return data
    },
    {
      throwOnError: true,
      onMutate: ({ context, mission, candidate }) => {
        // LEAVING COLUMN
        const queryToInvalidateLeavingColumn = invalidateQueriesMap.get(
          context.leavingColName as ColumnName
        ) as string
        const oldLeavingColumnCandidates = queryCache.getQueryData<Candidate[]>([
          queryToInvalidateLeavingColumn,
          { id: mission },
        ])

        const newLeavingColumnCandidates = oldLeavingColumnCandidates?.filter(
          (c) => c.id !== candidate
        )
        queryCache.setQueryData([queryToInvalidateLeavingColumn, { id: mission }], () => [
          ...newLeavingColumnCandidates,
        ])

        return () =>
          queryCache.setQueryData(
            [queryToInvalidateLeavingColumn, { id: mission }],
            () => oldLeavingColumnCandidates
          )
      },
      onError: (err, _, rollback: () => void) => rollback(),
      onSettled: (p) =>
        queryCache.invalidateQueries([
          invalidateQueriesMap.get(ColumnName.RECRUITED) as string,
          { id: p?.mission.split('/').pop() },
        ]),
    }
  )
}

const handleMutateColumnChange = (
  { mission, candidate: { leavingColName, ...candidate } }: UpdateCandidateRequest,
  enteringColName?: ColumnName
): (() => void) => {
  // LEAVING COLUMN
  const queryToInvalidateLeavingColumn = invalidateQueriesMap.get(leavingColName) as string
  const oldLeavingColumnCandidates = queryCache.getQueryData<Candidate[]>([
    queryToInvalidateLeavingColumn,
    { id: mission.id },
  ])

  const newLeavingColumnCandidates = oldLeavingColumnCandidates?.filter(
    (c) => c.id !== candidate.id
  )
  queryCache.setQueryData([queryToInvalidateLeavingColumn, { id: mission.id }], () => [
    ...newLeavingColumnCandidates,
  ])

  // ENTERING COLUMN
  if (enteringColName === (null || undefined)) return () => null
  const queryToInvalidateEnteringColumn = invalidateQueriesMap.get(enteringColName) as string
  queryCache.cancelQueries([queryToInvalidateEnteringColumn, { id: mission.id }])
  const prevEnteringColumnCandidates = queryCache.getQueryData<Candidate[]>([
    queryToInvalidateEnteringColumn,
    { id: mission.id },
  ])

  queryCache.setQueryData([queryToInvalidateEnteringColumn, { id: mission.id }], () => [
    ...prevEnteringColumnCandidates,
    candidate,
  ])

  return () => {
    queryCache.setQueryData(
      [queryToInvalidateLeavingColumn, { id: mission.id }],
      () => oldLeavingColumnCandidates
    )

    if (enteringColName) {
      queryCache.setQueryData(
        [queryToInvalidateEnteringColumn, { id: mission.id }],
        () => prevEnteringColumnCandidates
      )
    }
  }
}
