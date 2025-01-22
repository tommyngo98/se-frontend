export function groupMessagesByDate(messages: { from: string; text: string; timestamp: Date }[]) {
  return messages.reduce((acc, message) => {
    const dateKey: string = message.timestamp.toISOString().split("T")[0];

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(message);

    return acc;
  }, {} as Record<string, { from: string; text: string; timestamp: Date }[]>);
}
