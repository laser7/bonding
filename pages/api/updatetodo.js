import { todoList } from '../../share/constant/todoList'
// Handler function for the API route
export default function handler(req, res) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'POST':
      // Example: Update the status of an item in the bingoList
      const { index, todo } = req.body // Assuming request body contains index of the item to update and its new status
      todoList[index] = todo
      res.status(200).json({ message: 'todo updated successfully' })
      break
    default:
      // Handle unsupported methods
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
