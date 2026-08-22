"use client";

import { useEffect, useRef } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/http";

export function useEntityModalForm<TValues extends Record<string, unknown>, TEntity>({
  open,
  entity,
  toFormValues,
  emptyValues,
  validate,
  submit,
  successMessage,
  onSaved,
}: {
  open: boolean;
  entity: TEntity | null;
  toFormValues: (entity: TEntity) => TValues;
  emptyValues: () => TValues;
  validate?: (values: TValues) => string | null | undefined;
  submit: (values: TValues) => Promise<void>;
  successMessage: string;
  onSaved: () => void;
}): UseFormReturn<TValues> & { onSubmit: (values: TValues) => Promise<void> } {
  const form = useForm<TValues>({ defaultValues: emptyValues() as never });
  const { reset } = form;

  const toFormValuesRef = useRef(toFormValues);
  const emptyValuesRef = useRef(emptyValues);
  useEffect(() => {
    toFormValuesRef.current = toFormValues;
    emptyValuesRef.current = emptyValues;
  });

  useEffect(() => {
    if (!open) return;
    reset(entity ? toFormValuesRef.current(entity) : emptyValuesRef.current());
  }, [open, entity, reset]);

  async function onSubmit(values: TValues) {
    const validationError = validate?.(values);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    try {
      await submit(values);
    } catch (error) {
      toast.error(apiErrorMessage(error));
      return;
    }
    toast.success(successMessage);
    onSaved();
  }

  return { ...form, onSubmit };
}
