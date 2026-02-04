"use client";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Date Badge */}
      <div className="flex justify-center mb-6">
        <span className="bg-blue-100 text-primary text-xs font-medium px-3 py-1 rounded-full">
          28 April
        </span>
      </div>

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.senderId === "current" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-md ${
              message.senderId === "current"
                ? "bg-primary text-white"
                : "bg-white text-gray-900"
            } rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-sm`}
          >
            <p className="text-xs sm:text-sm">{message.content}</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span
                className={`text-xs ${
                  message.senderId === "current"
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {message.timestamp}
              </span>
              {message.senderId === "current" && message.isRead && (
                <svg
                  className="w-4 h-4 text-blue-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
