import { bingoList } from '../../share/constant/bingoList'

// Handler function for the API route
export default function handler(req, res) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      // Respond with the bingoList array as JSON
      res.status(200).json(bingoList)
      break
    case 'POST':
      // Example: Update the status of an item in the bingoList
      const { index, status } = req.body // Assuming request body contains index of the item to update and its new status
      bingoList[index].status = status
      res.status(200).json({ message: 'Item status updated successfully' })
      break
    default:
      // Handle unsupported methods
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
