export function createAdminProviderChatSocket(roomId: number, token: string) {
  const rawBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
  const wsBase = rawBase.startsWith("https://")
    ? rawBase.replace("https://", "wss://")
    : rawBase.replace("http://", "ws://");

  return new WebSocket(`${wsBase}/ws/admin-provider-chat/${roomId}/?token=${token}`);
}