import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useCallback, useEffect, useRef, useState } from 'react'
import { mapOrder } from '~/utils/sorts'

import { cloneDeep } from 'lodash'
import Card from './ColumnList/Column/CardList/Card/Card'
import Column from './ColumnList/Column/Column'
import ColumnList from './ColumnList/ColumnList'

import { PLACEHOLDER_CARD_ID } from '~/utils/constants'
import { MouseSenSor, TouchSensor } from '~/utils/customDndSensors'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board, createNewColumn, createNewCard }) {
  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  //cùng 1 thời điểm chỉ có 1 item đang kéo thả (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [columnToShowBorder, setColumnToShowBorder] = useState(null)
  const [cloneColumnWhenDraggingCard, setCloneColumnWhenDraggingCard] =
    useState(null)

  const lastOverId = useRef(null)
  const findColumnByCardId = (cardId) => {
    return orderedColumnsState.find((column) =>
      column.cards.map((card) => card._id).includes(cardId)
    )
  }

  const mouseSensor = useSensor(MouseSenSor, {
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

  // dragStart => collisionDetectionStrategy => dragOver => dragEnd
  const collisionDetectionStrategy = useCallback(
    (args) => {
      //trường hợp kéo thả column thì vẫn dùng closestCorners
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      //trường hợp kéo thả cards thì custom để tránh lỗi

      //tìm điểm giao nhau, va chạm
      const pointerIntersections = pointerWithin(args)

      //fix bug flickering, crash app của dndkit
      //--drag over card có image vào các illegal zone (trên cùng ra khỏi khu vực kéo thả) thì nó sẽ crash hoặc flickering, nên return
      if (!pointerIntersections?.length) return

      //thuật toán phát hiện va chạm sẽ trả về 1 mảng các va chạm ở đây
      // const intersections =
      //   pointerIntersections?.length > 0
      //     ? pointerIntersections
      //     : rectIntersection(args)

      let overId = getFirstCollision(pointerIntersections, 'id')

      if (overId) {
        //overId có thể là columnId hoặc cardId (khi dragOver chạm vào các cạnh của column thì overId là columnId)

        //kiểm tra xem có phải đang over cạnh column hay không
        const checkColumn = orderedColumnsState.find(
          (column) => column._id === overId
        )

        // nếu mình đang over đến 1 cạnh column
        if (checkColumn) {
          //lọc lại droppableContainers, chỉ lấy danh sách cards của column mình đang over
          // closestCorners trả về danh sách cards mà mình đã lọc và index 0 là card gần với vị trí mình over cạnh của column
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      //trường hợp overId là null

      //lưu lastOverId để trong quá trình di chuyển qua Column mới hoặc ngoài vùng thì có thể sẽ null thì nó sẽ biết lastOverId là gì để quay trở về đúng vị trí cũ

      //nó sẽ kiểm tra cái này để trả về hoặc là mảng rỗng
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumnsState]
  )

  const moveCardBetweenDifferentColumn = (
    overColumn,
    activeColumn,
    overCardId,
    over,
    active,
    activeCardId,
    activeCardData
  ) => {
    setOrderedColumnsState((prev) => {
      let newCardIndex

      const overCardIndex = overCardId.startsWith(PLACEHOLDER_CARD_ID)
        ? 0
        : overColumn.cards.findIndex((c) => c._id === overCardId)

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

        //đối với trường hợp dragEnd thì phải update dữ liệu columnId trong card khi kéo card giữa 2 col khác nhau
        const rebuild_activeCardData = {
          ...activeCardData,
          columnId: nextOverColumn._id
        }

        //thêm card đang được kéo vào overcolumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeCardData
        )

        //update cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        )
      }

      return nextColumns
    })
  }

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

    //lấy 2 column, overColumn phụ thuộc vào việc overCardId có phải là placeholder hay không
    //nếu là placeholder thì lấy columnId từ data của nó
    //
    const overColumn = overCardId.startsWith(PLACEHOLDER_CARD_ID)
      ? orderedColumnsState.find((c) => c._id === over.data.current.columnId)
      : findColumnByCardId(overCardId)

    const activeColumn = findColumnByCardId(activeCardId)

    if (!overColumn || !activeColumn) return

    //nếu drag và drop giữa 2 column
    if (overColumn._id !== activeColumn._id) {
      moveCardBetweenDifferentColumn(
        overColumn,
        activeColumn,
        overCardId,
        over,
        active,
        activeCardId,
        activeCardData
      )
    }
    setColumnToShowBorder(overColumn)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    // kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài) => return tránh lỗi
    if (!over) {
      setColumnToShowBorder(null)
      setActiveDragItemId(null)
      setActiveDragItemType(null)
      setActiveDragItemData(null)
      setCloneColumnWhenDraggingCard(null)
      return
    }

    //xử lí kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeCardId,
        data: { current: activeCardData }
      } = active

      const { id: overCardId } = over

      //lấy 2 column, overColumn phụ thuộc vào việc overCardId có phải là placeholder hay không
      //nếu là placeholder thì lấy columnId từ data của nó
      //
      const overColumn = overCardId.startsWith(PLACEHOLDER_CARD_ID)
        ? orderedColumnsState.find((c) => c._id === over.data.current.columnId)
        : findColumnByCardId(overCardId)

      const activeColumn = findColumnByCardId(activeCardId)

      if (!overColumn || !activeColumn) return

      //nếu kéo thả card ở 2 col khác nhau, overColumn và activeColumn khi này sẽ là column mà mình thả card vào

      //phải dùng cloneColumnWhenDraggingCard._id (set vào state từ handleDragStart) chứ không phải activeDragItemData.columnId trong scope handleDragEnd
      // vì sau khi đi qua onDragOver tới đây là state của card đã bị cập nhật (kiểm tra flowEventDraggingKDnnKid.png)

      if (cloneColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumn(
          overColumn,
          activeColumn,
          overCardId,
          over,
          active,
          activeCardId,
          activeCardData
        )
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
    setColumnToShowBorder(null)
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
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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
          activeColumnId={columnToShowBorder?._id}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
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
