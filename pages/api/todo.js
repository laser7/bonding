import { todoList } from '../../share/constant/todoList'

export default function handler(req, res) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      // Respond with the todoList array as JSON
      res.status(200).json(todoList)
      break
    case 'DELETE':
      const { index } = body

      if (index === undefined || index < 0 || index > todoList.length) {
        res.status(400).json({
          error: todoList.length + 'Invalid index',
        })
      } else {
        todoList.splice(index, 1) // Remove item at the specified index
        res.status(200).json({ message: 'Item deleted successfully' })
      }
      break
    case 'POST':
      const { action } = req.body
      if (action === 'update') {
        const { index, todo } = req.body
        todoList[index] = todo
        res.status(200).json({ message: 'todo updated successfully' })
      } else {
        const { todo } = req.body
        todoList.push(todo) // Add new item to the todoList
        res.status(201).json({ message: 'Item added successfully' })
      }

      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
