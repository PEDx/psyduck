import { useEffect, useRef, MutableRefObject } from 'react'

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>

export type TargetElement = HTMLElement | Element | Document | Window

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement,
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement
  }

  let targetElement: TargetElement | undefined | null

  if (typeof target === 'function') {
    targetElement = target()
  } else if ('current' in target) {
    targetElement = target.current
  } else {
    targetElement = target
  }

  return targetElement
}

// 鼠标点击事件，click 不会监听右键
const defaultEvent = 'click'

type EventType = MouseEvent | TouchEvent

export function useClickAway(
  target: BasicTarget | BasicTarget[],
  onClickAway: (event: EventType) => void,
  eventName: string = defaultEvent,
) {
  const onClickAwayRef = useRef(onClickAway)
  onClickAwayRef.current = onClickAway

  useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(target) ? target : [target]
      if (
        targets.some((targetItem) => {
          const targetElement = getTargetElement(targetItem) as HTMLElement
          return !targetElement || targetElement?.contains(event.target)
        })
      ) {
        return
      }
      onClickAwayRef.current(event)
    }

    document.addEventListener(eventName, handler)

    return () => {
      document.removeEventListener(eventName, handler)
    }
  }, [target, eventName])
}
