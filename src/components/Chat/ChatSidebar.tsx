"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  avatarUrl?: string | null;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  lastSeen?: string;
  chatType?: "admin_provider" | "user_admin";
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

  const getBadge = (chatType?: Conversation["chatType"]) => {
    if (chatType === "admin_provider") {
      return (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0">
          Provider
        </span>
      );
    }

    if (chatType === "user_admin") {
      return (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 shrink-0">
          User
        </span>
      );
    }

    return null;
  };

  return (
    <div
      className={`${
        showMobileSidebar ? "w-full" : "hidden"
      } lg:w-80 lg:block border-r flex flex-col`}
    >
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Messages
          </h2>
        </div>

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

      <div className="flex-1 overflow-y-auto">
        {conversations
          .filter((conv) =>
            conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((conv) => {
            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conv.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="relative shrink-0">
                  {conv.avatarUrl ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${conv.avatarUrl}`}
                      alt={conv.name}
                      className="w-10 h-10 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                        conv.id,
                      )}`}
                    >
                      {conv.avatar}
                    </div>
                  )}
                  {conv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="font-semibold text-sm truncate">
                        {conv.name}
                      </h3>
                      {getBadge(conv.chatType)}
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">
                      {conv.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-gray-600 truncate">
                      {conv.lastMessage || "No messages yet"}
                    </p>
                    {conv.unreadCount && conv.unreadCount > 0 ? (
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shrink-0 ml-2">
                        {conv.unreadCount}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
