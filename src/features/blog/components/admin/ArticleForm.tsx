"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apiErrorMessage, uploadImage } from "@/lib/http";
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
  const { register, handleSubmit, reset, setValue, watch } = useForm<ArticleInput>({
    defaultValues: emptyForm(),
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  async function onSubmit(values: ArticleInput) {
    if (!values.title.trim() || !values.category.trim() || !values.content.trim()) {
      toast.error("لطفاً عنوان، دسته‌بندی و متن مقاله را وارد کنید.");
      return;
    }
    if (isUploadingImage) {
      toast.error("لطفاً تا پایان آپلود تصویر صبر کنید.");
      return;
    }
    try {
      await createArticle.mutateAsync(values);
    } catch (error) {
      toast.error(apiErrorMessage(error));
      return;
    }
    toast.success("مقاله جدید با موفقیت ایجاد شد.");
    reset(emptyForm());
    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 rounded-[20px] border border-admin-line bg-white p-6"
    >
      <TextField
        label="عنوان مقاله"
        type="text"
        {...register("title", { required: true })}
        placeholder="مثال: چگونه بدون سموم شیمیایی خانه‌ای کاملاً ضدعفونی داشته باشیم؟"
      />

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        <SelectField label="دسته‌بندی" {...register("category", { required: true })}>
          <option value="">انتخاب دسته‌بندی</option>
          {(categories ?? []).map((category) => (
            <option key={category.id} value={category.title}>
              {category.title}
            </option>
          ))}
        </SelectField>
        <TextField
          label="نویسنده"
          type="text"
          {...register("author")}
          placeholder="تیم شست‌وشو سبز"
        />
      </div>

      <label className="flex w-full flex-col gap-2 text-right">
        <span className="text-sm font-semibold text-admin-ink">تصویر مقاله</span>
        <input
          type="file"
          accept="image/*"
          disabled={isUploadingImage}
          onChange={async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (!file.type.startsWith("image/")) {
              event.target.value = "";
              toast.error("لطفاً یک فایل تصویری معتبر انتخاب کنید.");
              return;
            }
            if (file.size > 2 * 1024 * 1024) {
              event.target.value = "";
              toast.error("حجم تصویر نباید بیشتر از ۲ مگابایت باشد.");
              return;
            }
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
          className="w-full rounded-xl border border-admin-line px-4 py-2.5 text-sm text-admin-ink file:ml-3 file:rounded-lg file:border-0 file:bg-admin-bg file:px-3 file:py-2 file:text-sm file:font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        />
        <span className="text-xs text-admin-muted">
          {isUploadingImage ? "در حال آپلود تصویر..." : "حداکثر ۲ مگابایت"}
        </span>
        {watch("image") ? (
          <div className="relative mt-1 h-36 w-full overflow-hidden rounded-2xl border border-admin-line bg-admin-bg">
            <ArticleImagePreview src={watch("image")} />
          </div>
        ) : null}
      </label>

      <TextAreaField
        label="خلاصه مقاله"
        rows={3}
        {...register("excerpt", { required: true })}
        placeholder="یک یا دو جمله برای معرفی مقاله"
      />

      <TextAreaField
        label="متن مقاله"
        rows={8}
        {...register("content", { required: true })}
        placeholder="هر پاراگراف را در یک خط جداگانه بنویسید"
      />

      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer rounded-xl border border-admin-line px-5 py-2.5 text-sm font-semibold text-admin-ink transition hover:bg-admin-bg"
        >
          انصراف
        </button>
        <button
          type="submit"
          disabled={createArticle.isPending}
          className="cursor-pointer rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createArticle.isPending ? "در حال ذخیره..." : "انتشار مقاله"}
        </button>
      </div>
    </form>
  );
}
