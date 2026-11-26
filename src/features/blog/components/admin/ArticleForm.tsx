"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { apiErrorMessage, uploadImage } from "@/lib/http";
import { pickImageFile } from "@/lib/pickImageFile";
import { TextField, TextAreaField, SelectField } from "@/components/ui/FormField";
import ArticleImagePreview from "./ArticleImagePreview";
import { useCreateArticle } from "@/features/blog/hooks";
import type { ArticleInput } from "@/features/blog/hooks";
import { useCategories } from "@/features/products/hooks/useCategories";

function emptyForm(): ArticleInput {
  return { title: "", excerpt: "", content: "", image: "", author: "", category: "" };
}

export default function ArticleForm() {
  const router = useRouter();
  const createArticle = useCreateArticle();
  const { data: categories } = useCategories();
  const { register, handleSubmit, reset, setValue, control } = useForm<ArticleInput>({
    defaultValues: emptyForm(),
  });
  const image = useWatch({ control, name: "image" });
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  async function onSubmit(values: ArticleInput) {
    if (!values.title.trim() || !values.category.trim() || !values.content.trim()) {
      toast.error("Please enter a title, category and article body.");
      return;
    }
    if (isUploadingImage) {
      toast.error("Please wait for the image upload to finish.");
      return;
    }
    try {
      await createArticle.mutateAsync(values);
    } catch (error) {
      toast.error(apiErrorMessage(error));
      return;
    }
    toast.success("Article created successfully.");
    reset(emptyForm());
    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 rounded-[20px] border border-admin-line bg-white p-6"
    >
      <TextField
        label="Article title"
        type="text"
        {...register("title", { required: true })}
        placeholder="e.g. How to disinfect your home without harsh chemicals"
      />

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        <SelectField label="Category" {...register("category", { required: true })}>
          <option value="">Select a category</option>
          {(categories ?? []).map((category) => (
            <option key={category.id} value={category.title}>
              {category.title}
            </option>
          ))}
        </SelectField>
        <TextField label="Author" type="text" {...register("author")} placeholder="Leafwash Team" />
      </div>

      <label className="flex w-full flex-col gap-2 text-left">
        <span className="text-sm font-semibold text-admin-ink">Article image</span>
        <input
          type="file"
          accept="image/*"
          disabled={isUploadingImage}
          onChange={async (event: ChangeEvent<HTMLInputElement>) => {
            const file = pickImageFile(event);
            if (!file) return;
            setIsUploadingImage(true);
            try {
              const url = await uploadImage(file);
              setValue("image", url, { shouldDirty: true });
            } catch (error) {
              toast.error(apiErrorMessage(error));
            } finally {
              setIsUploadingImage(false);
              event.target.value = "";
            }
          }}
          className="w-full rounded-xl border border-admin-line px-4 py-2.5 text-sm text-admin-ink file:mr-3 file:rounded-lg file:border-0 file:bg-admin-bg file:px-3 file:py-2 file:text-sm file:font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        />
        <span className="text-xs text-admin-muted">
          {isUploadingImage ? "Uploading image..." : "Max 2 MB"}
        </span>
        {image ? (
          <div className="relative mt-1 h-36 w-full overflow-hidden rounded-2xl border border-admin-line bg-admin-bg">
            <ArticleImagePreview src={image} />
          </div>
        ) : null}
      </label>

      <TextAreaField
        label="Excerpt"
        rows={3}
        {...register("excerpt", { required: true })}
        placeholder="One or two sentences introducing the article"
      />

      <TextAreaField
        label="Article body"
        rows={8}
        {...register("content", { required: true })}
        placeholder="Write each paragraph on its own line"
      />

      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-xl border border-admin-line px-5 py-2.5 text-sm font-semibold text-admin-ink transition hover:bg-admin-bg"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={createArticle.isPending}
          className="rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createArticle.isPending ? "Saving..." : "Publish article"}
        </button>
      </div>
    </form>
  );
}
