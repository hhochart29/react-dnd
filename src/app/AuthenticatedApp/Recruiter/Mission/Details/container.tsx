import { RouteComponentProps } from '@reach/router'
import Loader from 'components/Loader'
import React, { FC } from 'react'
import Detail from './component'
import { useParams } from '@reach/router'
import { useApi } from 'app/contexts/ApiContext'

const DetailContainer: FC<RouteComponentProps> = () => {
  const { missions } = useApi()

  const { id } = useParams() as { id: string }
  const { data: mission, isLoading } = missions.useGetMission(id)

  if (isLoading) {
    return <Loader isFullscreen />
  }

  if (!mission) {
    return <div>No mission found</div>
  }

  return <Detail mission={mission} />
}

export default DetailContainer
