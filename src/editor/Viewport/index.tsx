import { FC, useEffect, useRef, useState, useCallback, MouseEvent } from 'react'
import { Box } from '@chakra-ui/react'
import { ImageElement } from '@/core/Element/ImageElement'
import { PsyduckNode } from '@/core/Renderer'
import { event } from '@/editor/event'
import { PsyduckElement } from '@/core/Element'
import { effect, stop } from '@vue/reactivity'
import { useUpdate } from '@/hooks/useUpdate'

const readValue = (obj: Record<string, unknown>) =>
  Object.values(obj).forEach((v) => v)

const EditBlock = function <T>({
  element,
}: {
  element: PsyduckElement<T | {}>
}) {
  const nodeRef = useRef<HTMLDivElement | null>(null)
  const update = useUpdate()
  const noWrap = false
  const [node] = useState<PsyduckNode<T | {}>>(new PsyduckNode(element))

  useEffect(() => {
    const runner = effect(() => {
      readValue(node.data)
      update()
    })
    return () => {
      stop(runner)
    }
  }, [])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      // 展示控制
      event.emit('select-node', node as PsyduckNode<unknown>)
    },
    [node],
  )

  const ElementView = node.element.view

  if (noWrap) return <ElementView {...node.data} />

  return (
    <div
      data-pid={node.id}
      ref={nodeRef}
      onClick={handleClick}
      style={{
        cursor: 'pointer',
      }}
    >
      <ElementView {...node.data} />
    </div>
  )
}

export const Viewport: FC = () => {
  return (
    <Box h={812} w={375} bg={'#fff'} m='0 auto'>
      <EditBlock element={ImageElement} />
      <EditBlock element={ImageElement} />
      <EditBlock element={ImageElement} />
    </Box>
  )
}
