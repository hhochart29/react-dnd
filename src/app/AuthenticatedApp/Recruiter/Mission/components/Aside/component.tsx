import { CheckOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import styles from './styles.module.scss'

interface OwnProps {
  messages: Array<string>
}

const Aside: FC<OwnProps> = ({ messages }) => {
  return (
    <>
      <div className={styles.children}>
        {messages.map((v, i) => (
          <div key={i}>
            <CheckOutlined />
            <p>{v}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Aside
