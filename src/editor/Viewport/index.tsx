import {
  createContext,
  useContext,
  FC,
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent,
} from 'react'
import { Box } from '@chakra-ui/react'
import { ImageElement } from '@/core/Element/ImageElement'
import { ContainerElement } from '@/core/Element/ContainerElement'
import { PsyduckNode } from '@/core/Renderer'
import { event } from '@/editor/event'
import { PsyduckElement } from '@/core/Element'
import { effect, stop } from '@vue/reactivity'
import { useUpdate } from '@/hooks/useUpdate'
import { useClickAway } from '@/hooks/useClickAway'
import './style.scss'

const ViewportContext = createContext({
  selectId: '',
  setSelectId: (id: string) => {},
})

const readValue = (obj: Record<string, unknown>) =>
  Object.values(obj).forEach((v) => v)

const EditBlock = function <T>({ node }: { node: PsyduckNode<T | {}> }) {
  const { selectId, setSelectId } = useContext(ViewportContext)
  const nodeRef = useRef<HTMLDivElement | null>(null)
  const update = useUpdate()
  const noWrap = false

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
      setSelectId(node.id)
      event.emit('select-node', node as PsyduckNode<unknown>)
      e.stopPropagation()
    },
    [node],
  )

  const ElementView = node.element.view
  const ElementViewChildren = node.children || []

  if (noWrap) return <ElementView {...node.data} />

  const select = selectId === node.id

  return (
    <div
      data-pid={node.id}
      ref={nodeRef}
      onClick={handleClick}
      className='psyduck-edit-block'
      style={{
        cursor: 'pointer',
        outline: select ? '1px solid red' : '',
      }}
    >
      <ElementView {...node.data}>
        {ElementViewChildren.map((nod) => (
          <EditBlock node={nod} key={nod.id} />
        ))}
      </ElementView>
    </div>
  )
}

export const Viewport: FC = () => {
  const [selectId, setSelectId] = useState('')
  const boxRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef(new PsyduckNode(ContainerElement))

  useClickAway(boxRef, () => {
    setSelectId('')
  })

  useEffect(() => {
    rootRef.current.children.push(new PsyduckNode(ImageElement))
  }, [])

  return (
    <ViewportContext.Provider
      value={{
        selectId,
        setSelectId,
      }}
    >
      <Box h={812} w={375} bg={'#fff'} m='0 auto' ref={boxRef}>
        <EditBlock node={rootRef.current} />
      </Box>
    </ViewportContext.Provider>
  )
}
