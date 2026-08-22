
import type { Category, CategoryInput } from "@/features/products/types";
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { TextField, SelectField } from "@/components/ui/FormField";

const iconOptions: { value: Category["icon"]; label: string }[] = [
  { value: "spray", label: "اسپری" },
  { value: "shirt", label: "لباس" },
  { value: "soup", label: "ظرفشویی" },
  { value: "home", label: "خانه" },
  { value: "flower", label: "گل" },
];

const bgOptions = ["bg-brand-300", "bg-blue-100", "bg-amber-100", "bg-red-100", "bg-purple-100", "bg-green-100"];

type Props = {
  register: UseFormRegister<CategoryInput>;
  watch: UseFormWatch<CategoryInput>;
  setValue: UseFormSetValue<CategoryInput>;
};

export { bgOptions };

export default function CategoryFormFields({ register, watch, setValue }: Props) {
  const selectedBg = watch("bg");
  return (
    <>
      <TextField label="عنوان دسته‌بندی" type="text" {...register("title", { required: true })} placeholder="مثال: اسپری‌های چندمنظوره" />
      <SelectField label="آیکون" {...register("icon")}>
        {iconOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </SelectField>
      <label className="flex w-full flex-col gap-1.5 text-right">
        <span className="text-sm font-semibold text-admin-ink">رنگ پس‌زمینه</span>
        <div className="flex flex-wrap gap-2">
          {bgOptions.map((bg) => (
            <button key={bg} type="button" onClick={() => setValue("bg", bg, { shouldDirty: true })} className={`size-9 rounded-lg ${bg} ${selectedBg === bg ? "ring-2 ring-admin-primary ring-offset-2" : ""}`} aria-label={bg} />
          ))}
        </div>
      </label>
    </>
  );
}
