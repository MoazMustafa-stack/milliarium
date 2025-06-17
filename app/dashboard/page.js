'use client'

import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'
import { TaskCard } from '@/components/kanban/TaskCard'
import TaskForm from '@/components/ui/TaskForm'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user on mount and set up auth subscription
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // Fetch tasks when user changes or on mount
    if (user) {
      fetchTasks()
      
      // Listen for real-time updates
      let subscription
      try {
        subscription = supabase
          .channel('tasks')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'tasks',
              filter: `user_id=eq.${user.id}`
            },
            (payload) => {
              console.log('Real-time update received:', payload)
              console.log('Payload data:', payload)
              
              if (payload.eventType === 'UPDATE' && payload.new) {
                // Update the specific task in state directly
                setTasks(prevTasks => prevTasks.map(task => 
                  task.id === payload.new.id ? { ...task, ...payload.new } : task
                ))
              } else if (payload.eventType === 'INSERT' && payload.new) {
                // Add new task to state
                setTasks(prevTasks => [...prevTasks, payload.new])
              } else if (payload.eventType === 'DELETE' && payload.old) {
                // Remove deleted task from state
                setTasks(prevTasks => prevTasks.filter(task => task.id !== payload.old.id))
              }
            }
          )
          .subscribe()
        console.log('Successfully subscribed to real-time updates with user_id filter')
      } catch (error) {
        console.error('Error subscribing to real-time updates:', error)
        // Fallback to polling if real-time fails
        const interval = setInterval(fetchTasks, 5000)
        return () => clearInterval(interval)
      }

      return () => {
        try {
          if (subscription) {
            subscription.unsubscribe()
          }
        } catch (error) {
          console.error('Error unsubscribing:', error)
        }
      }
    }
  }, [user])

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks...')
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching tasks:', error)
        throw error
      }
      console.log('Tasks fetched:', data)
      setTasks(data || [])
    } catch (error) {
      console.error('Error in fetchTasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (taskData) => {
    try {
      if (!user) {
        console.error('No user authenticated')
        return
      }

      console.log('Adding task:', { ...taskData, user_id: user.id })
      const { error } = await supabase.from('tasks').insert([
        { ...taskData, user_id: user.id }
      ])

      if (error) {
        console.error('Error adding task:', error)
        throw error
      }
      console.log('Task added successfully')
      
      // Fetch tasks immediately after adding
      fetchTasks()
    } catch (error) {
      console.error('Error in addTask:', error)
    }
  }

  const updateTask = async (taskId, updates) => {
    try {
      if (!user) {
        console.error('No user authenticated')
        return
      }

      console.log('UpdateTask called with:', { taskId, updates })
      
      // Add user_id to updates if it's not already there
      const updateData = {
        ...updates,
        user_id: user.id
      }

      console.log('Updating task:', taskId, updateData)
      const { error, data } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', taskId)
        .eq('user_id', user.id)
        .select()

      if (error) {
        console.error('Error updating task:', error)
        throw error
      }
      
      console.log('Task updated successfully:', data)
      
      // Update tasks state directly with the new data
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, ...data[0] } : task
        )
      )
      
      // Also fetch tasks to ensure consistency
      fetchTasks()
    } catch (error) {
      console.error('Error in updateTask:', error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      if (!user) {
        console.error('No user authenticated')
        return
      }

      console.log('Deleting task:', taskId)
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error deleting task:', error)
        throw error
      }
      console.log('Task deleted successfully')
      
      // Fetch tasks to update UI
      fetchTasks()
    } catch (error) {
      console.error('Error in deleteTask:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Milliarium Task Board</h1>
        <TaskForm onAddTask={addTask} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {['todo', 'in-progress', 'review', 'done'].map((status) => (
          <div key={status} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}