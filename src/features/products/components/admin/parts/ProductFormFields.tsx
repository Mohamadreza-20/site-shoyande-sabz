import type { ChangeEvent, RefObject } from "react";
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { toast } from "sonner";
import ProductImage from "../../ProductImage";
import type { Category, ProductInput } from "@/features/products/types";
import { TextField, TextAreaField, adminInputClass } from "@/components/ui/FormField";
import { uploadImage } from "@/lib/http";
import { pickImageFile } from "@/lib/pickImageFile";

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
    const file = pickImageFile(event);
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadImage(file);
      setValue("image", imageUrl, { shouldDirty: true, shouldValidate: true });
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  }

  return (
    <>
      <TextField
        label="Product title"
        type="text"
        {...register("title", { required: true })}
        placeholder="e.g. Lemon Dish Soap"
      />

      <label className="flex w-full flex-col gap-1.5 text-left">
        <span className="text-sm font-semibold text-admin-ink">Category</span>
        <input
          type="text"
          {...register("category", { required: true })}
          placeholder="e.g. Dish Soap"
          list="product-category-options"
          className={adminInputClass}
        />
        <datalist id="product-category-options">
          {categories.map((category) => (
            <option key={category.id} value={category.title} />
          ))}
        </datalist>
      </label>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField
          label="Price (USD)"
          type="number"
          min={0}
          {...register("priceValue", { valueAsNumber: true, required: true, min: 1 })}
        />
        <TextField
          label="Price before discount"
          type="number"
          min={0}
          {...register("oldPriceValue", {
            setValueAs: (value) =>
              value === "" || value === undefined ? undefined : Number(value),
          })}
          placeholder="Optional"
        />
      </div>

      <TextField
        label="Stock"
        type="number"
        min={0}
        {...register("stock", { valueAsNumber: true })}
      />

      <label className="flex w-full flex-col gap-2 text-left">
        <span className="text-sm font-semibold text-admin-ink">Product image</span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
            className="rounded-xl border border-admin-line bg-white px-4 py-2 text-sm font-semibold text-admin-ink transition hover:bg-admin-bg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {watch("image") ? "Change image" : "Choose image"}
          </button>
          {watch("image") ? (
            <button
              type="button"
              onClick={() => {
                setValue("image", "", { shouldDirty: true, shouldValidate: true });
                toast.success("Product image removed.");
              }}
              disabled={busy}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Remove image
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
        <span className="text-xs text-admin-muted">Max 2 MB · JPG, PNG, WebP or GIF</span>
        {watch("image") ? (
          <div className="relative mt-1 h-36 w-full overflow-hidden rounded-2xl border border-admin-line bg-admin-bg">
            <ProductImage
              src={watch("image")}
              alt="Product image preview"
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-contain"
            />
          </div>
        ) : null}
      </label>

      <TextAreaField label="Description" rows={3} {...register("description")} />
      <TextAreaField
        label="Key features"
        rows={3}
        placeholder="One feature per line"
        {...register("highlightsText")}
      />
      <TextAreaField label="How to use" rows={2} {...register("usage")} />
    </>
  );
}
