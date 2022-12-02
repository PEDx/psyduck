import { useRef, useState, useEffect, useMemo, FC } from 'react'
import { Input } from '@chakra-ui/react'
import { useUpdate } from '@/hooks/useUpdate'
import { event } from '../event'

export const RightPanel: FC = () => {
  const update = useUpdate()
  const [data, setData] = useState<Record<string, unknown>>({})
  useEffect(() => {
    event.on('select-node', (node) => {
      setData(node.data)
    })
    return () => event.clear('select-node')
  }, [])

  return (
    <div>
      <Input
        placeholder='Basic usage'
        value={(data.text as string) || ''}
        onChange={(e) => {
          data.text = e.target.value
          update()
        }}
      />
    </div>
  )
}
