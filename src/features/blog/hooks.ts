"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle, type ArticleInput } from "./api";
import { articleKeys } from "./queryKeys";
import { revalidateBlogCache } from "@/lib/actions";

export function useCreateArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ArticleInput) => createArticle(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.list() });
      void revalidateBlogCache();
    },
  });
}

export type { ArticleInput };
