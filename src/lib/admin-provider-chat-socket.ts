export function createAdminProviderChatSocket(roomId: number, token: string) {
  const rawBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
  const wsBase = rawBase.startsWith("https://")
    ? rawBase.replace("https://", "wss://")
    : rawBase.replace("http://", "ws://");

  // IMPORTANT:
  // admin side-ও এখন unified ws path use করবে
  return new WebSocket(`${wsBase}/ws/chat/${roomId}/?token=${token}`);
}