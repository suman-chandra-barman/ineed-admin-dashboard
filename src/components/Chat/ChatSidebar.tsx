"use client";

import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

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

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  searchQuery: string;
  showMobileSidebar: boolean;
  onSelectConversation: (id: string) => void;
  onSearchChange: (query: string) => void;
}

export default function ChatSidebar({
  conversations,
  selectedConversation,
  searchQuery,
  showMobileSidebar,
  onSelectConversation,
  onSearchChange,
}: ChatSidebarProps) {
  const getAvatarColor = (convId: string) => {
    if (convId === "2" || convId === "6") return "bg-purple-500";
    if (convId === "3") return "bg-pink-500";
    if (convId === "4") return "bg-blue-500";
    return "bg-gray-400";
  };

  return (
    <div
      className={`${
        showMobileSidebar ? "w-full" : "hidden"
      } lg:w-80 lg:block border-r flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Messages
            <ChevronDown className="w-5 h-5" />
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations
          .filter((conv) =>
            conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation === conv.id ? "bg-blue-50" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                    conv.id,
                  )}`}
                >
                  {conv.avatar}
                </div>
                {conv.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* Message Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm truncate">
                    {conv.name}
                  </h3>
                  <span className="text-xs text-gray-500 shrink-0">
                    {conv.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {conv.lastMessage}
                  </p>
                  {conv.unreadCount && conv.unreadCount > 0 ? (
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shrink-0 ml-2">
                      {conv.unreadCount}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
