
import { useState } from "react";
import { Message, Role } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, ArrowLeft, RefreshCw } from "lucide-react";

interface ChatRoomProps {
  userRole: Role;
  onGoBack: () => void;
  onRematch: () => void;
}

export const ChatRoom = ({ userRole, onGoBack, onRematch }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "user1",
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-perspective-100 to-perspective-200 p-4 font-mono">
      <Card className="flex-1 flex flex-col max-w-2xl w-full mx-auto backdrop-blur-lg bg-white/90 rounded-2xl shadow-xl">
        <div className="p-4 border-b flex items-center justify-between">
          <Button
            onClick={onGoBack}
            variant="ghost"
            className="text-perspective-600 hover:text-perspective-700 hover:bg-perspective-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            End Session
          </Button>
          <Button
            onClick={onRematch}
            variant="ghost"
            className="text-perspective-600 hover:text-perspective-700 hover:bg-perspective-100"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Rematch me!
          </Button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === "user1" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.senderId === "user1"
                      ? "bg-perspective-400 text-white"
                      : "bg-perspective-100 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-white/50"
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="bg-perspective-400 hover:bg-perspective-500 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
