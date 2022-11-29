import { FC, useEffect, useRef, useState, useCallback, MouseEvent } from 'react'
import { Box } from '@chakra-ui/react'
import { ImageElement } from '@/core/Element/ImageElement'
import { PsyduckNode } from '@/core/Renderer'
import { event } from '@/editor/event'
import { PsyduckElement } from '@/core/Element'

const EditComponent = function <T>({
  element,
}: {
  element: PsyduckElement<T | {}>
}) {
  const nodeRef = useRef<HTMLDivElement | null>(null)
  const noWrap = false
  const [node] = useState<PsyduckNode<T | {}>>(new PsyduckNode(element))

  useEffect(() => {
    // console.log(node)
    // console.log(nodeRef.current!.firstChild)
  }, [])

  const handleClick = useCallback((e: MouseEvent) => {
    // 展示控制
    event.emit('select-node', node as PsyduckNode<unknown>)
  }, [])

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
      <EditComponent element={ImageElement} />
      <EditComponent element={ImageElement} />
      <EditComponent element={ImageElement} />
    </Box>
  )
}
