import { createServer } from "http"
import { parse } from "url"
import { existsSync, readFileSync } from "fs"
import { join } from "path"

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname } = parsedUrl

  if (pathname && pathname.endsWith(".txt")) {
    // The file path is relative to the root of your Next.js project
    const filePath = join(process.cwd(), pathname)

    if (existsSync(filePath)) {
      const content = readFileSync(filePath, "utf-8")
      res.setHeader("Content-Type", "text/plain")
      res.end(content)
    } else {
      res.statusCode = 404
      res.end("File not found")
    }
  } else {
    // Handle other requests (e.g., normal Next.js page requests)
    res.statusCode = 404
    res.end("Page not found")
  }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
})
