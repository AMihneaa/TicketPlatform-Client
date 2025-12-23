import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X } from "lucide-react"

type ChatMessage = {
  id: number
  role: "user" | "assistant"
  content: string
}

let messageId = 0
const CHAT_API_URL = "http://127.0.0.1:8000/chat" // fara trailing slash

function getOrCreateSessionId() {
  const key = "chat_session_id"
  const existing = localStorage.getItem(key)
  if (existing) return existing

  const fresh =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  localStorage.setItem(key, fresh)
  return fresh
}

function parseSseEvents(buffer: string) {
  const events = buffer.split("\n\n")
  const remainder = events.pop() ?? ""
  const payloads: string[] = []

  for (const evt of events) {
    const lines = evt.split("\n")
    const dataLines = lines.filter((l) => l.startsWith("data:"))
    if (!dataLines.length) continue

    const data = dataLines.map((l) => l.slice(5).trimStart()).join("\n")

    try {
      const obj = JSON.parse(data)
      if (typeof obj?.token === "string") payloads.push(obj.token)
      else if (typeof obj?.text === "string") payloads.push(obj.text)
      else payloads.push(String(data))
    } catch {
      payloads.push(data)
    }
  }

  return { payloads, remainder }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: ++messageId,
      role: "assistant",
      content:
        "Hi! I’m your travel assistant. Ask me about routes, prices or the fastest way to get from A to B.",
    },
  ])

  const sessionIdRef = useRef<string>("")
  const abortRef = useRef<AbortController | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId()
  }, [])

  // auto-scroll la final
  useEffect(() => {
    if (!isOpen) return
    const el = scrollAreaRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, isOpen])

  // inchidere -> opreste stream
  useEffect(() => {
    if (!isOpen && abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
      setIsSending(false)
    }
  }, [isOpen])

  const handleToggle = () => setIsOpen((p) => !p)

  const appendToAssistantMessage = (assistantId: number, chunk: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId ? { ...m, content: m.content + chunk } : m
      )
    )
  }

  const replaceAssistantMessage = (assistantId: number, content: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === assistantId ? { ...m, content } : m))
    )
  }

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isSending) return

    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }

    const userMessage: ChatMessage = {
      id: ++messageId,
      role: "user",
      content: trimmed,
    }

    const assistantId = ++messageId
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setInput("")
    setIsSending(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream, text/plain, application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          session_id: sessionIdRef.current,
        }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const t = await res.text().catch(() => "")
        throw new Error(`HTTP ${res.status} ${t}`)
      }
      if (!res.body) throw new Error("No response body (stream not supported).")

      const contentType = res.headers.get("content-type") || ""
      const reader = res.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let buffer = ""

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })

        if (contentType.includes("text/event-stream")) {
          buffer += chunk
          const { payloads, remainder } = parseSseEvents(buffer)
          buffer = remainder
          for (const p of payloads) appendToAssistantMessage(assistantId, p)
        } else {
          appendToAssistantMessage(assistantId, chunk)
        }
      }

      if (contentType.includes("text/event-stream") && buffer.trim().length) {
        const { payloads } = parseSseEvents(buffer + "\n\n")
        for (const p of payloads) appendToAssistantMessage(assistantId, p)
      }
    } catch (err: any) {
      if (err?.name === "AbortError") {
        replaceAssistantMessage(assistantId, "[stopped]")
      } else {
        replaceAssistantMessage(
          assistantId,
          "Sorry, I couldn't reach the assistant service. Please try again later."
        )
      }
    } finally {
      setIsSending(false)
      abortRef.current = null
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
          onClick={handleToggle}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open travel assistant chat</span>
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 flex h-[420px] w-[360px] max-w-[90vw] flex-col border-muted/70 shadow-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="space-y-1">
              <CardTitle className="text-base">
                Travel Assistant{" "}
                <Badge variant="outline" className="ml-1 text-[0.65rem]">
                  AI
                </Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Ask about routes, prices or your tickets.
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleToggle}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close chat</span>
            </Button>
          </CardHeader>

          {/* AICI e zona exact din screenshot: LISTA DE MESAJE cu scroll */}
          <div className="flex-1 min-h-0 px-6 pb-2">
            <div
              ref={scrollAreaRef}
              className="h-full min-h-0 overflow-y-auto pr-3 space-y-3"
              style={{
                scrollbarGutter: "stable", // pastreaza spatiu pt scrollbar (unde e suportat)
              }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap break-words ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.content ||
                      (m.role === "assistant" && isSending ? "..." : "")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CardFooter className="border-t bg-background/80 px-3 py-2">
            <form
              className="flex w-full items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
            >
              <Input
                placeholder="Ask me about a route..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-sm"
                disabled={isSending}
              />
              <Button type="submit" size="sm" disabled={isSending}>
                {isSending ? "..." : "Send"}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
