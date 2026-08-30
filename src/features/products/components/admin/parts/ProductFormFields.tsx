
import type { ChangeEvent, RefObject } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "sonner";
import ProductImage from "../../ProductImage";
import type { Category, ProductInput } from "@/features/products/types";
import { TextField, TextAreaField } from "@/components/ui/FormField";
import { uploadImage } from "@/lib/http";

type ProductFormValues = Omit<ProductInput, "highlights"> & { highlightsText: string };

type Props = {
  categories: Category[];
  register: UseFormRegister<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  busy: boolean;
  setUploadingImage: (value: boolean) => void;
};

export default function ProductFormFields({
  categories,
  register,
  setValue,
  watch,
  fileInputRef,
  busy,
  setUploadingImage,
}: Props) {
  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
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

    setUploadingImage(true);
    try {
      const imageUrl = await uploadImage(file);
      setValue("image", imageUrl, { shouldDirty: true, shouldValidate: true });
      toast.success("تصویر با موفقیت آپلود شد.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "آپلود تصویر انجام نشد.");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  }

  return (
    <>
      <TextField
        label="عنوان محصول"
        type="text"
        {...register("title", { required: true })}
        placeholder="مثال: مایع ظرفشویی با عصاره لیمو"
      />

      <label className="flex w-full flex-col gap-1.5 text-right">
        <span className="text-sm font-semibold text-admin-ink">دسته‌بندی</span>
        <input
          type="text"
          {...register("category", { required: true })}
          placeholder="مثال: مایع ظرفشویی"
          list="product-category-options"
          className="w-full rounded-xl border border-admin-line px-4 py-2.5 text-right text-sm text-admin-ink placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/30"
        />
        <datalist id="product-category-options">
          {categories.map((category) => (
            <option key={category.id} value={category.title} />
          ))}
        </datalist>
      </label>

      <div className="grid w-full grid-cols-2 gap-3">
        <TextField
          label="قیمت (تومان)"
          type="number"
          min={0}
          {...register("priceValue", { valueAsNumber: true, required: true, min: 1 })}
        />
        <TextField
          label="قیمت قبل از تخفیف"
          type="number"
          min={0}
          {...register("oldPriceValue", {
            setValueAs: (value) => (value === "" || value === undefined ? undefined : Number(value)),
          })}
          placeholder="اختیاری"
        />
      </div>

      <TextField
        label="موجودی انبار"
        type="number"
        min={0}
        {...register("stock", { valueAsNumber: true })}
      />

      <label className="flex w-full flex-col gap-2 text-right">
        <span className="text-sm font-semibold text-admin-ink">تصویر محصول</span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
            className="rounded-xl border border-admin-line bg-white px-4 py-2 text-sm font-semibold text-admin-ink transition hover:bg-admin-bg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {watch("image") ? "تغییر تصویر" : "انتخاب تصویر"}
          </button>
          {watch("image") ? (
            <button
              type="button"
              onClick={() => {
                setValue("image", "", { shouldDirty: true, shouldValidate: true });
                toast.success("تصویر محصول حذف شد.");
              }}
              disabled={busy}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              حذف تصویر
            </button>
          ) : null}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="sr-only"
        />
        <span className="text-xs text-admin-muted">
          حداکثر ۲ مگابایت · فایل‌های JPG، PNG، WebP یا GIF
        </span>
        {watch("image") ? (
          <div className="relative mt-1 h-36 w-full overflow-hidden rounded-2xl border border-admin-line bg-admin-bg">
            <ProductImage
              src={watch("image")}
              alt="پیش‌نمایش تصویر محصول"
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-contain"
            />
          </div>
        ) : null}
      </label>

      <TextAreaField label="توضیحات" rows={3} {...register("description")} />
      <TextAreaField
        label="ویژگی‌های کلیدی"
        rows={3}
        placeholder="هر ویژگی را در یک خط بنویسید"
        {...register("highlightsText")}
      />
      <TextAreaField label="طریقه استفاده" rows={2} {...register("usage")} />
    </>
  );
}
