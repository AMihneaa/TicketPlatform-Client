import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X } from "lucide-react"

type ChatMessage = {
  id: number
  role: "user" | "assistant"
  content: string
}

let messageId = 0

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

  const handleToggle = () => setIsOpen((prev) => !prev)

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isSending) return

    const userMessage: ChatMessage = {
      id: ++messageId,
      role: "user",
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsSending(true)

    try {
      const replyText =
        "For now I am a demo. Here you will see the optimal route or ticket suggestions coming from LM Studio."

      const assistantMessage: ChatMessage = {
        id: ++messageId,
        role: "assistant",
        content: replyText,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      const errorMessage: ChatMessage = {
        id: ++messageId,
        role: "assistant",
        content:
          "Sorry, I couldn't reach the assistant service. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsSending(false)
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
        <Card className="fixed bottom-6 right-6 z-50 flex h-[420px] w-[360px] max-w-[90vw] flex-col border-muted/70 shadow-2xl">
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

          <CardContent className="flex-1 pb-2">
            <div className="h-full space-y-3 overflow-y-auto pr-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

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
