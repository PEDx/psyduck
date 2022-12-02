import { getRandomStr } from '@/utils'
import { reactive } from '@vue/reactivity'
import { PsyduckElement } from '../Element'

export class PsyduckNode<K> {
  readonly id: string
  readonly dom: HTMLElement | null = null
  readonly name: string
  readonly version: string | null = null
  readonly data: Record<string, unknown> = {}
  readonly children: PsyduckNode<unknown>[] = []
  readonly element: PsyduckElement<K>
  constructor(element: PsyduckElement<K>) {
    this.id = getRandomStr(8)

    const data: Record<string, unknown> = {}

    Object.keys(element.data).forEach((key) => {
      data[key] = element.data[key as keyof typeof element.data]?.value
    })

    this.data = reactive(data)

    this.name = element.view.name
    this.element = element
  }
  destory() {}
}

export class PsyduckRenderer {
  root: null = null
  build() {}
  render() {}
  instantiation() {}
  serialize() {}
}
