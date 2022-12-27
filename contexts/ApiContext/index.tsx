import React, { FC } from 'react'
import services from './services'

const ApiContext = React.createContext(services)

export const ApiProvider: FC = (props) => {
  return <ApiContext.Provider value={services} {...props} />
}

export const useApi = (): typeof services => React.useContext(ApiContext)
