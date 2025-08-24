import { useEffect, useState } from 'react'
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sorts'

import ColumnList from './ColumnList/ColumnList'
import Column from './ColumnList/Column/Column'
import Card from './ColumnList/Column/CardList/Card/Card'
import { order } from '@mui/system'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  //cùng 1 thời điểm chỉ có 1 item đang kéo thả (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10 // khoảng cách chuột di chuyển tối thiểu để kích hoạt kéo thả là 10px
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // nhấn giữ 250ms thì mới kích hoạt kéo thả
      tolerance: 5 //ngón tay không di chuyển quá 5px trong thời gian 250ms
    }
  })

  // kết hợp 2 sensor lại với nhau (mouse + touch) để trải nghiệm tốt nhất trên mobile và desktop
  // nếu chỉ dùng mouseSensor thì trên mobile sẽ không kéo thả được
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    const orderedColumns = mapOrder(
      board?.columns,
      board?.columnOrderIds,
      '_id'
    )
    setOrderedColumnsState(orderedColumns)
  }, [board])

  const handleDragStart = (event) => {
    const { active } = event

    setActiveDragItemId(active?.id)
    setActiveDragItemType(
      active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(active?.data?.current)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    console.log(over)

    // kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài) => return tránh lỗi
    if (!over) return

    // Nếu vị trí sau khi kéo thả khác với vị tri trí ban đầu
    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex((c) => c._id === active.id)
      const newIndex = orderedColumnsState.findIndex((c) => c._id === over.id)

      const dndOrderedColumns = arrayMove(
        orderedColumnsState,
        oldIndex,
        newIndex
      )

      //xử lí api sau
      //const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)
      setOrderedColumnsState(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    // if (event.over) {
    //   setOrderedColumnsState((prevColumns) => {
    //     const oldIndex = prevColumns.findIndex((c) => c._id === active.id)
    //     const newIndex = prevColumns.findIndex((c) => c._id === over.id)
    //     const clonePrevColumns = [...prevColumns]
    //     // clonePrevColumns.splice(oldIndex, 1)
    //     // clonePrevColumns.splice(newIndex, 0, active.data.current)

    //     arrayMove(prevColumns, oldIndex, newIndex)
    //     return clonePrevColumns
    //   })
    // }
  }

  const getColumnIndex = (columnId) => {
    return Object.keys(orderedColumnsState).find(
      (key) => orderedColumnsState[key]._id === columnId
    )
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    console.log(active, over)

    //stop if it is not dragging a card
    if (!active?.data?.current?.columnId) {
      return
    }
    //stop if it is same place after drag and drop
    if (active.id === over.id) return

    const activeColumnIndex = getColumnIndex(active?.data?.current?.columnId)
    const overColumnIndex = getColumnIndex(over?.data?.current?.columnId)
    console.log('active: ', activeColumnIndex)
    console.log('over: ', overColumnIndex)

    // index after drop card
    const overCardIndex = orderedColumnsState[overColumnIndex].cards.findIndex(
      (c) => c._id === over.id
    )

    //index after drag/pickup card
    const activeCardIndex = orderedColumnsState[
      activeColumnIndex
    ].cards.findIndex((c) => c._id === active.id)
    console.log('drop index: ', overCardIndex)
    console.log('pick up index: ', activeCardIndex)

    setOrderedColumnsState((prevColumnsState) => {
      const cloneColumn = [...prevColumnsState]

      return cloneColumn
    })
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5
        }
      }
    })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <Box
        sx={{
          backgroundColor: 'primary.main',
          height: (theme) => theme.custom.boardContentHeight,
          width: '100%',
          p: '10px 0'
        }}
      >
        <ColumnList columns={orderedColumnsState} />

        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
