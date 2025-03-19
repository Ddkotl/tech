"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AvatarField } from "./avatar-field";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Spinner,
} from "@/shared/components";
import { Profile } from "@/entities/user/profile";
import { useUpdateProfileMutation } from "../_vm/use-update-profile";
import { UserId } from "@/entities/user";
import { toast } from "sonner";

const profileFormSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
});

const getDefaultValues = (profile: Profile) => {
  return {
    name: profile.name ?? undefined,
    email: profile.email,
    image: profile.image ?? undefined,
  };
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({
  userId,
  profile,
  onSuccess,
  submitText = "Сохранить",
}: {
  userId: UserId;
  profile: Profile;
  onSuccess?: () => void;
  submitText?: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(profile),
  });

  const updateProfileMutation = useUpdateProfileMutation();

  async function onSubmit(data: ProfileFormValues) {
    const newProfileValues = await updateProfileMutation.update({
      userId,
      data,
    });
    form.reset(getDefaultValues(newProfileValues.profile));
    onSuccess?.();
    toast("Профиль успешно обновлен");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormDescription>Email</FormDescription>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormDescription>Имя пользователя</FormDescription>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormDescription>Аватарка</FormDescription>
              <FormControl>
                <AvatarField value={field.value} onChange={field.onChange} profile={profile} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateProfileMutation.isPending}>
          {updateProfileMutation.isPending && (
            <Spinner className="mr-2 h-4 w-4 animate-spin" aria-label="Обновление профиля" />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
