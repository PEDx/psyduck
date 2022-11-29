import { PsyduckNode } from '@/core/Renderer'
import { Event } from '@/core/Renderer/Event'

export const event = new Event<{
  'select-node': PsyduckNode<unknown>
}>()
