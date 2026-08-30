"use client";

import { useRef, useState } from "react";
import type { Product, Category, ProductInput } from "@/features/products/types";
import { useCreateProduct, useUpdateProduct } from "@/features/products/hooks";
import { useEntityModalForm } from "@/lib/hooks/useEntityModalForm";
import { ModalFormActions } from "@/components/ui/ModalFormActions";
import Modal from "@/components/ui/Modal";
import ProductFormFields from "./parts/ProductFormFields";

type ProductFormValues = Omit<ProductInput, "highlights"> & { highlightsText: string };

function emptyForm(): ProductFormValues {
  return {
    title: "",
    category: "",
    priceValue: 0,
    oldPriceValue: undefined,
    stock: 0,
    image: "",
    description: "",
    usage: "",
    highlightsText: "",
  };
}

function toFormValues(product: Product): ProductFormValues {
  return {
    title: product.title,
    category: product.category,
    priceValue: product.priceValue,
    oldPriceValue: product.oldPriceValue,
    stock: product.stock ?? 0,
    image: product.image,
    description: product.description,
    usage: product.usage,
    highlightsText: product.highlights.join("\n"),
  };
}

export default function ProductModal({
  open,
  onClose,
  onSaved,
  product,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  product: Product | null;
  categories: Category[];
}) {
  const isEdit = Boolean(product);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const saving = createProduct.isPending || updateProduct.isPending;
  const busy = saving || uploadingImage;

  const { register, handleSubmit, onSubmit, setValue, watch } = useEntityModalForm<
    ProductFormValues,
    Product
  >({
    open,
    entity: product,
    toFormValues,
    emptyValues: emptyForm,
    validate: (form) =>
      !form.title.trim() || !form.category.trim() || form.priceValue <= 0
        ? "لطفاً عنوان، دسته‌بندی و قیمت را به‌درستی وارد کنید."
        : null,
    submit: async (form) => {
      const payload: ProductInput = {
        title: form.title,
        category: form.category,
        priceValue: form.priceValue,
        oldPriceValue: form.oldPriceValue,
        stock: form.stock,
        description: form.description,
        usage: form.usage,
        image: form.image.trim() || "/images/catalog/product-1.svg",
        highlights: form.highlightsText
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      };
      if (isEdit && product) await updateProduct.mutateAsync({ id: product.id, input: payload });
      else await createProduct.mutateAsync(payload);
    },
    successMessage: isEdit ? "محصول با موفقیت ویرایش شد." : "محصول جدید با موفقیت افزوده شد.",
    onSaved,
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "ویرایش محصول" : "افزودن محصول جدید"}
      description="اطلاعات محصول را وارد کنید و ذخیره کنید."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <ProductFormFields
          categories={categories}
          register={register}
          setValue={setValue}
          watch={watch}
          fileInputRef={fileInputRef}
          busy={busy}
          setUploadingImage={setUploadingImage}
        />
        <ModalFormActions
          onCancel={onClose}
          saving={busy}
          savingLabel={uploadingImage ? "در حال آپلود تصویر..." : "در حال ذخیره..."}
          submitLabel={isEdit ? "ذخیره تغییرات" : "افزودن محصول"}
        />
      </form>
    </Modal>
  );
}
