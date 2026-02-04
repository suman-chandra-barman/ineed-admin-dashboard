"use client";

import { Send, Mic, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  messageInput: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export default function ChatInput({
  messageInput,
  onMessageChange,
  onSendMessage,
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <div className="p-2 sm:p-4 border-t bg-white">
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" size="icon" className="shrink-0 hidden sm:flex">
          <Plus className="w-5 h-5" />
        </Button>
        <Input
          type="text"
          placeholder="Write your message..."
          value={messageInput}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border-gray-200 text-sm sm:text-base rounded-full"
        />
        <Button onClick={onSendMessage} size="icon" className="shrink-0">
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
