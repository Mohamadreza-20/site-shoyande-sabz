import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessage, getMessages, getMessagesByUserId, replyToMessage } from "../api";
import type { ContactMessage } from "../types";
import { messageKeys } from "../queryKeys";

export function useMessages(initialData?: ContactMessage[], initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: messageKeys.list(),
    queryFn: getMessages,
    initialData,
    initialDataUpdatedAt,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

export function useUserMessages(
  userId: string | undefined,
  initialData?: ContactMessage[],
  initialDataUpdatedAt?: number
) {
  return useQuery({
    queryKey: messageKeys.byUser(userId ?? ""),
    queryFn: () => getMessagesByUserId(userId as string),
    initialData,
    initialDataUpdatedAt,
    enabled: Boolean(userId),
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      name: string;
      email: string;
      userId?: string;
      phone?: string;
      subject: string;
      message: string;
    }) => createMessage(input),
    onSuccess: (data) => {
      queryClient.setQueryData<ContactMessage[]>(messageKeys.list(), (prev) =>
        prev ? [data, ...prev] : prev
      );
      if (data.userId) {
        queryClient.setQueryData<ContactMessage[]>(messageKeys.byUser(data.userId), (prev) =>
          prev ? [data, ...prev] : prev
        );
      }
    },
  });
}

export function useReplyToMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reply }: { id: string; reply: string }) => replyToMessage(id, reply),
    onSuccess: (data, variables) => {
      queryClient.setQueryData<ContactMessage[]>(messageKeys.list(), (prev) =>
        prev ? prev.map((message) => (message.id === variables.id ? data : message)) : prev
      );
    },
  });
}
