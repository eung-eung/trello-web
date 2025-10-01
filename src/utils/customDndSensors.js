import {
  MouseSensor as DndKitMouseSensor,
  TouchSensor as DndKitTouchSensor
} from '@dnd-kit/core'

export class MouseSenSor extends DndKitMouseSensor {
  static activators = [
    {
      eventName: 'onMouseDown',
      handler: ({ nativeEvent: event }) => {
        return shouldHandleEvent(event.target)
      }
    }
  ]
}

export class TouchSensor extends DndKitTouchSensor {
  static activators = [
    {
      eventName: 'onTouchStart',
      handler: ({ nativeEvent: event }) => {
        return shouldHandleEvent(event.target)
      }
    }
  ]
}

function shouldHandleEvent(element) {
  let cur = element

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement
  }

  return true
}