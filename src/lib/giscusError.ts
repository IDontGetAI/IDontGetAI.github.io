export function getGiscusErrorMessage(error: unknown) {
  if (typeof error === "string") return error.trim();
  if (error instanceof Error) return error.message.trim();
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

export function isDiscussionNotFoundError(message: string) {
  return message.toLowerCase().includes("discussion not found");
}

