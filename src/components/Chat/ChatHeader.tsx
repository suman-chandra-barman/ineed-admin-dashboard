"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  lastSeen?: string;
}

interface ChatHeaderProps {
  selectedConv: Conversation;
  onBackToList: () => void;
}

export default function ChatHeader({
  selectedConv,
  onBackToList,
}: ChatHeaderProps) {
  const getAvatarColor = (convId: string) => {
    if (convId === "2" || convId === "6") return "bg-purple-500";
    if (convId === "3") return "bg-pink-500";
    if (convId === "4") return "bg-blue-500";
    return "bg-gray-400";
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-3">
        {/* Back Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0"
          onClick={onBackToList}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
            selectedConv.id,
          )}`}
        >
          {selectedConv.avatar}
        </div>
        <div>
          <h3 className="font-semibold">{selectedConv.name}</h3>
          <p className="text-xs text-gray-500">
            {selectedConv.isOnline
              ? "Active now"
              : selectedConv.lastSeen || "Last seen 7h ago"}
          </p>
        </div>
      </div>
    </div>
  );
}
