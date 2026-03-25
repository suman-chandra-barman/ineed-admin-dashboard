"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatInput from "@/components/Chat/ChatInput";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import {
  useGetAdminProviderRoomsQuery,
  useLazyGetAdminProviderMessagesQuery,
  useMarkAdminProviderReadMutation,
} from "@/redux/features/chat/adminProviderChatApi";
import {
  mapAdminProviderMessageToUI,
  mapAdminProviderRoomToConversation,
  mapAdminProviderSocketMessageToUI,
} from "@/lib/admin-provider-chat-mappers";
import { createAdminProviderChatSocket } from "@/lib/admin-provider-chat-socket";

interface UIMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  createdAt?: string;
  attachment?: string | null;
}

export default function AdminMessagesPage() {
  const searchParams = useSearchParams();
  const roomIdFromQuery = searchParams.get("roomId");

  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const [messages, setMessages] = useState<Record<string, UIMessage[]>>({});

  const socketRef = useRef<WebSocket | null>(null);
  const hasInitializedFromQuery = useRef(false);

  const {
    data: roomsResponse,
    isLoading: roomsLoading,
    refetch,
  } = useGetAdminProviderRoomsQuery();

  const [getMessages] = useLazyGetAdminProviderMessagesQuery();
  const [markRead] = useMarkAdminProviderReadMutation();

  const conversations = useMemo(() => {
    return (roomsResponse?.data || []).map(mapAdminProviderRoomToConversation);
  }, [roomsResponse]);

  const selectedConv =
    conversations.find((c) => c.id === selectedConversation) || null;

  const currentUserId = user?.id || "";

  useEffect(() => {
    // Only set from query param once on initial load
    if (
      roomIdFromQuery &&
      conversations.length > 0 &&
      !hasInitializedFromQuery.current
    ) {
      const match = conversations.find(
        (c) => String(c.roomId) === String(roomIdFromQuery),
      );

      if (match) {
        setSelectedConversation(match.id);
        setShowMobileSidebar(false);
        hasInitializedFromQuery.current = true;
        return;
      }
    }

    // Set first conversation if none selected
    if (!selectedConversation && conversations.length > 0) {
      setSelectedConversation(conversations[0].id);
    }
  }, [conversations, selectedConversation, roomIdFromQuery]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedConv) return;

      try {
        const res = await getMessages(selectedConv.roomId).unwrap();
        const mapped = (res.data || []).map((msg) =>
          mapAdminProviderMessageToUI(msg, currentUserId),
        );

        setMessages((prev) => ({
          ...prev,
          [selectedConv.id]: mapped,
        }));

        await markRead(selectedConv.roomId).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    };

    loadMessages();
  }, [selectedConv, getMessages, markRead, currentUserId, refetch]);

  useEffect(() => {
    if (!selectedConv || !token || !currentUserId) return;

    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = createAdminProviderChatSocket(selectedConv.roomId, token);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "chat.message") {
        const uiMessage = mapAdminProviderSocketMessageToUI(
          data,
          currentUserId,
        );

        setMessages((prev) => {
          const existing = prev[selectedConv.id] || [];
          const alreadyExists = existing.some(
            (msg) => String(msg.id) === String(uiMessage.id),
          );
          if (alreadyExists) return prev;

          return {
            ...prev,
            [selectedConv.id]: [...existing, uiMessage],
          };
        });

        markRead(selectedConv.roomId);
        refetch();
      }
    };

    socket.onerror = (error) => {
      console.error("admin chat socket error", error);
    };

    return () => {
      socket.close();
    };
  }, [selectedConv, token, currentUserId, markRead, refetch]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN)
      return;

    socketRef.current.send(JSON.stringify({ message: messageInput }));
    setMessageInput("");
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setShowMobileSidebar(false);
  };

  const handleBackToList = () => {
    setShowMobileSidebar(true);
  };

  const conversationMessages = selectedConversation
    ? messages[selectedConversation] || []
    : [];

  return (
    <main>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-[calc(100vh-9rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-8rem)]">
        <div className="flex h-full">
          <ChatSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            searchQuery={searchQuery}
            showMobileSidebar={showMobileSidebar}
            onSelectConversation={handleSelectConversation}
            onSearchChange={setSearchQuery}
          />

          <div
            className={`${showMobileSidebar ? "hidden" : "flex"} lg:flex flex-1 flex-col`}
          >
            {selectedConv ? (
              <>
                <ChatHeader
                  selectedConv={selectedConv}
                  onBackToList={handleBackToList}
                />

                <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-50">
                  <ChatMessages messages={conversationMessages} />
                </div>

                <ChatInput
                  messageInput={messageInput}
                  onMessageChange={setMessageInput}
                  onSendMessage={handleSendMessage}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">
                  {roomsLoading
                    ? "Loading conversations..."
                    : "Select a conversation to start chatting"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
