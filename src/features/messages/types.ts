export type MessageStatus = "pending" | "answered";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  userId?: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: MessageStatus;
  reply?: string | null;
  repliedAt?: string | null;
};
