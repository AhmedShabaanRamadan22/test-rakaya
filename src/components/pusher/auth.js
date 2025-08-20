import Pusher from "pusher"

export default function handler(req, res) {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    useTLS: true,
  })

  const { socket_id, channel_name } = req.body

  try {
    const authResponse = pusher.authenticate(socket_id, channel_name)
    res.status(200).json(authResponse)
  } catch (error) {
    console.error("Pusher auth error:", error)
    res.status(500).json({ error: "Authentication failed" })
  }
}
