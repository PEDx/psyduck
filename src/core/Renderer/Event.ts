import { logger } from './Logger'

export type TEventTypeDataMap = {
  [key: string]: unknown
}

export class Event<T extends TEventTypeDataMap> {
  private map: { [eventName: string]: Function[] } = {}

  private cache: {
    [eventName: string]: T[keyof T] | null
  } = {}

  on(eventName: keyof T, fn: (data: T[keyof T]) => void) {
    if (!this.map[eventName as string]) {
      this.map[eventName as string] = []
    }
    this.map[eventName as string].push(fn)
    /**
     * 如果有未处理发射事件就直接调用一次
     */
    if (this.cache[eventName as string]) {
      this.emit(eventName, this.cache[eventName as string] as T[keyof T])
      this.cache[eventName as string] = null
    }
  }

  emit(eventName: keyof T, data?: T[keyof T]) {
    let fns = this.map[eventName as string]
    if (!fns || fns.length === 0) {
      /**
       * 此时监听事件可能未注册，将最近发射事件存起来
       */
      logger.warn(`事件 ${eventName as string} 未注册`)
      if (data !== undefined) this.cache[eventName as string] = data
      return false
    }
    fns.forEach((callback) => {
      callback(data)
    })
  }

  off(eventName: keyof T, fn: Function) {
    let fns = this.map[eventName as string]
    if (!fns) return false
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      fns.forEach((callback: Function, i: number) => {
        if (callback === fn) {
          fns.splice(i, 1)
        }
      })
    }
  }
  clear(eventName: keyof T) {
    this.map[eventName as string] = []
  }
}
