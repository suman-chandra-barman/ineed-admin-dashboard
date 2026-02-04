"use client";

import { useState } from "react";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatInput from "@/components/Chat/ChatInput";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

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

function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);

  // Mock data
  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Dianne Russell",
      avatar: "DR",
      lastMessage: "Woohoooo",
      timestamp: "06:47",
      unreadCount: 0,
    },
    {
      id: "2",
      name: "Theresa Webb",
      avatar: "TW",
      lastMessage: "omg, this is amazing",
      timestamp: "02:45",
      unreadCount: 1,
    },
    {
      id: "3",
      name: "Cody Fisher",
      avatar: "CF",
      lastMessage: "Haha oh man",
      timestamp: "2 week ago",
      unreadCount: 0,
    },
    {
      id: "4",
      name: "Brooklyn Simmons",
      avatar: "BS",
      lastMessage: "How are you?",
      timestamp: "08:00",
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: "5",
      name: "Savannah Nguyen",
      avatar: "SN",
      lastMessage: "I'll be there in 2 mins",
      timestamp: "5/27/15",
      unreadCount: 0,
    },
    {
      id: "6",
      name: "Ronald Richards",
      avatar: "RR",
      lastMessage: "just ideas for next time",
      timestamp: "07:13",
      unreadCount: 2,
    },
    {
      id: "7",
      name: "Cameron Williamson",
      avatar: "CW",
      lastMessage: "perfect!",
      timestamp: "00:05",
      unreadCount: 0,
    },
    {
      id: "8",
      name: "Robert Fox",
      avatar: "RF",
      lastMessage: "Haha that's terrifying 😅",
      timestamp: "12:34",
      unreadCount: 1,
    },
  ];

  const messages: Record<string, Message[]> = {
    "1": [
      {
        id: "1",
        senderId: "1",
        content: "Morning around 10 AM. It's a 2-bedroom apartment.",
        timestamp: "7:55",
        isRead: true,
      },
      {
        id: "2",
        senderId: "current",
        content:
          "That works for me. The estimated time is around 5 hours. Is that okay?",
        timestamp: "11:25",
        isRead: true,
      },
    ],
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversation);
  const conversationMessages = selectedConversation
    ? messages[selectedConversation] || []
    : [];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setShowMobileSidebar(false);
  };

  const handleBackToList = () => {
    setShowMobileSidebar(true);
  };

  return (
    <main>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-[calc(100vh-9rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-8rem)]">
        <div className="flex h-full">
          {/* Sidebar - Message List */}
          <ChatSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            searchQuery={searchQuery}
            showMobileSidebar={showMobileSidebar}
            onSelectConversation={handleSelectConversation}
            onSearchChange={setSearchQuery}
          />

          {/* Main Chat Area */}
          <div
            className={`${
              showMobileSidebar ? "hidden" : "flex"
            } lg:flex flex-1 flex-col`}
          >
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <ChatHeader
                  selectedConv={selectedConv}
                  onBackToList={handleBackToList}
                />

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-50">
                  <ChatMessages messages={conversationMessages} />
                </div>

                {/* Message Input */}
                <ChatInput
                  messageInput={messageInput}
                  onMessageChange={setMessageInput}
                  onSendMessage={handleSendMessage}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">
                  Select a conversation to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MessagesPage;
