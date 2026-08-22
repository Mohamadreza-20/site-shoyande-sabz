"use client";
import Pagination from "@/components/Pagination";
import type { ContactMessage } from "@/features/messages/types";
import { MessageListItem } from "../MessageListItem";
export default function MessagesListPane({ messages, selectedId, onSelect, page, totalPages, onPageChange }: { messages: ContactMessage[]; selectedId: string | null; onSelect: (id: string) => void; page: number; totalPages: number; onPageChange: (page: number) => void }) { return <div className="flex w-full flex-col gap-2 rounded-3xl border border-admin-line bg-white p-4 lg:w-[360px] lg:shrink-0">{messages.map((message) => <MessageListItem key={message.id} message={message} isSelected={message.id === selectedId} onSelect={onSelect} />)}<div className="flex w-full items-center justify-center pt-2"><Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} /></div></div>; }
