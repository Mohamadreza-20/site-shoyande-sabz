import MessageDetail from "../MessageDetail";
import type { ContactMessage } from "@/features/messages/types";
export default function MessagesDetailPane({ message }: { message: ContactMessage | null }) { return message ? <MessageDetail key={message.id} message={message} /> : <div className="flex w-full flex-1 items-center justify-center rounded-3xl border border-admin-line bg-white p-16 text-sm text-admin-muted">یک پیام را انتخاب کنید.</div>; }
