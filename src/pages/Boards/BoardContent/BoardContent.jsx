import { useCallback, useEffect, useRef, useState } from 'react'
import {
  closestCenter,
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  MouseSensor,
  pointerWithin,
  rectIntersection,
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
import { cloneDeep } from 'lodash'

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
  const [activeColumn, setActiveColumn] = useState(null)
  const [cloneColumnWhenDraggingCard, setCloneColumnWhenDraggingCard] =
    useState(null)

  const getColumnIndex = (columnId) => {
    return Object.keys(orderedColumnsState).find(
      (key) => orderedColumnsState[key]._id === columnId
    )
  }

  const findColumnByCardId = (cardId) => {
    return orderedColumnsState.find((column) =>
      column.cards.map((card) => card._id).includes(cardId)
    )
  }

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

    //nếu kéo card thì mới thực hiện set giá trị clone column
    if (active?.data?.current?.columnId) {
      setCloneColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    //không làm gì nếu kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { over, active } = event
    if (!over || !active) return

    const {
      id: activeCardId,
      data: { current: activeCardData }
    } = active

    const { id: overCardId } = over

    //lấy 2 column
    const overColumn = findColumnByCardId(overCardId)
    const activeColumn = findColumnByCardId(activeCardId)

    if (!overColumn || !activeColumn) return

    //nếu drag và drop giữa 2 column
    if (overColumn._id !== activeColumn._id) {
      setOrderedColumnsState((prev) => {
        let newCardIndex

        const overCardIndex = overColumn.cards.findIndex(
          (c) => c._id === overCardId
        )

        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1

        // clone deep để tránh mutate chính prev, xử lí trên mảng mới
        const nextColumns = cloneDeep(prev)
        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        )
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        )

        //column của card đang bị kéo (column cũ)
        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeCardId
          )
          //update cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          )
        }

        //column mới
        if (nextOverColumn) {
          //check card đang kéo có tồn tại trong over column chưa, nếu có thì xoá đi
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeCardId
          )

          //thêm card đang được kéo vào overcolumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeCardData
          )

          //update cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          )
        }

        return nextColumns
      })
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    // kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài) => return tránh lỗi
    if (!over) return

    //xử lí kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeCardId } = active

      const { id: overCardId } = over

      //lấy 2 column
      const overColumn = findColumnByCardId(overCardId)
      const activeColumn = findColumnByCardId(activeCardId)

      if (!overColumn || !activeColumn) return

      //nếu kéo thả card ở 2 col khác nhau, overColumn và activeColumn khi này sẽ là column mà mình thả card vào

      //phải dùng cloneColumnWhenDraggingCard._id (set vào state từ handleDragStart) chứ không phải activeData trong scope handleDragEnd
      // vì sau khi đi qua onDragOver tới đây là state của card đã bị cập nhật (kiểm tra flowEventDraggingKDnnKid.png)

      if (cloneColumnWhenDraggingCard._id !== overColumn._id) {
      } else {
        //hành động kéo thả card trong cùng 1 column

        //lấy vị trí cũ (từ thằng cloneColumnWhenDraggingCard)
        const oldCardIndex = cloneColumnWhenDraggingCard?.cards.findIndex(
          (c) => c._id === activeDragItemId
        )

        //lấy vị trí mới (từ thằng overColumn)
        const newCardIndex = overColumn?.cards.findIndex(
          (c) => c._id === overCardId
        )

        const dndOrderedCards = arrayMove(
          cloneColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        )

        setOrderedColumnsState((prevColumns) => {
          const clonePrevColumns = cloneDeep(prevColumns)

          //tìm tới Column mà đang thả
          const targetColumn = clonePrevColumns.find(
            (c) => c._id === overColumn._id
          )

          //cập nhật card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id)

          return clonePrevColumns
        })
      }
    }

    // xử lí kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu vị trí column sau khi kéo thả khác với vị tri trí ban đầu
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumnsState.findIndex(
          (c) => c._id === active.id
        )
        const newColumnIndex = orderedColumnsState.findIndex(
          (c) => c._id === over.id
        )

        const dndOrderedColumns = arrayMove(
          orderedColumnsState,
          oldColumnIndex,
          newColumnIndex
        )

        //xử lí api sau
        setOrderedColumnsState(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setActiveColumn(null)
    setCloneColumnWhenDraggingCard(null)
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
      collisionDetection={closestCorners}
    >
      <Box
        sx={{
          backgroundColor: 'primary.main',
          height: (theme) => theme.custom.boardContentHeight,
          width: '100%',
          p: '10px 0'
        }}
      >
        <ColumnList
          columns={orderedColumnsState}
          activeColumnId={activeColumn}
        />

        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} isOverlay />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
