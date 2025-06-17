import { useState, useEffect } from 'react'
import { format } from 'date-fns'

function getStatusColor(status) {
  switch (status) {
    case 'todo':
      return 'bg-blue-100 text-blue-800'
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800'
    case 'review':
      return 'bg-purple-100 text-purple-800'
    case 'done':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function TaskCard({ task, onUpdate, onDelete }) {
  console.log('TaskCard props:', { task, onUpdate, onDelete })
  
  const [isEditing, setIsEditing] = useState(false)
  const [newStatus, setNewStatus] = useState(task.status || 'todo')

  useEffect(() => {
    setNewStatus(task.status || 'todo')
  }, [task.status])

  const handleStatusChange = (e) => {
    e.stopPropagation();
    setNewStatus(e.target.value)
    console.log('Status changed to:', e.target.value)
    // Update the task immediately in the UI
    onUpdate(task.id, { status: e.target.value })
  }

  const handleUpdate = async () => {
    console.log('TaskCard handleUpdate called:', { taskId: task.id, newStatus })
    try {
      // Already updated in handleStatusChange
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDelete = async (e) => {
    e.stopPropagation();
    console.log('TaskCard handleDelete called:', task.id)
    try {
      await onDelete(task.id)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div 
      className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
      style={{
        minWidth: '200px',
        minHeight: '100px',
        cursor: 'pointer'
      }}
      onClick={(e) => {
        e.stopPropagation();
        console.log('TaskCard clicked:', task.id);
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
            }}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            {isEditing ? '✅' : '✏️'}
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Due: {task.due_date ? format(new Date(task.due_date), 'MMM d, yyyy') : 'No due date'}
        </p>
        {isEditing ? (
          <select
            value={newStatus}
            onChange={(e) => {
              e.stopPropagation();
              handleStatusChange(e);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        ) : (
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
            {task.status.replace('-', ' ')}
          </span>
        )}
      </div>
    </div>
  )
}
