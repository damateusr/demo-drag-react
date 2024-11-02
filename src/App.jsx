import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { useEffect } from "react"
import { useState } from "react"


const initialToDos = JSON.parse(localStorage.getItem('todos')) || [
  {id:1, text:'Aprender react Js'},
  {id:2, text:'Aprender Js'},
  {id:3, text:'Aprender Vue Js'}
]


const App = ()=>{
  const [toDos, setToDos] = useState(initialToDos)

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(toDos))
  },toDos)

  const handleDragEnd = (result)=>{
    if(!result.destination) return;
    
    const starIndex = result.source.index
    const endIndex = result.destination.index

    const copyArr = [...toDos]
    const [reorderArray] = copyArr.splice(starIndex,1)
    
    copyArr.splice(endIndex, 0, reorderArray)
    setToDos(copyArr)

  } 

  return( 
      <DragDropContext onDragEnd={handleDragEnd}>
        <h1>Todo App</h1>
        <Droppable droppableId="todos">
          {(droppableProvider) =>(
              <ul ref={droppableProvider.innerRef} {...droppableProvider.droppableProps}>
                {
                  toDos.map((todo, index)=>(
                    <Draggable draggableId={`${todo.id}`} key={todo.id} index={index}>
                      {
                        (draggableProv) => (
                        <li ref={draggableProv.innerRef}
                        {...draggableProv.draggableProps}
                        {...draggableProv.dragHandleProps}>
                          {todo.text}</li>
                        )
                      }
                    </Draggable>
                  ))
                }
                {droppableProvider.placeholder}
              </ul>
            )}
        </Droppable>
      </DragDropContext>
  )
}

export default App