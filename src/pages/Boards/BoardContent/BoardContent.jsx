import { useEffect, useState } from 'react'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sorts'
import ColumnList from './ColumnList/ColumnList'

function BoardContent({ board }) {
  const [orderedColumnsState, setOrderedColumnsState] = useState([])

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

  const handleDragEnd = (event) => {
    const { active, over } = event

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
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          height: (theme) => theme.custom.boardContentHeight,
          width: '100%',
          p: '10px 0'
        }}
      >
        <ColumnList columns={orderedColumnsState} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
