"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useProfile, useUpdateProfile, useChangePassword } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function AccountPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const token = session?.accessToken;
  const { data: profile, isLoading } = useProfile(token);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated" || isLoading || !profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="mt-6 h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={profile.avatarUrl ?? undefined} />
          <AvatarFallback className="text-lg">
            {profile.name[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <Badge variant="secondary" className="capitalize">
              {profile.role.toLowerCase()}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="mt-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <ProfileForm
            name={profile.name}
            token={token}
            onUpdated={(newName) => update({ name: newName })}
          />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <PasswordForm hasPassword={profile.hasPassword} token={token} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileForm({
  name,
  token,
  onUpdated,
}: {
  name: string;
  token: string | undefined;
  onUpdated: (newName: string) => void;
}) {
  const [value, setValue] = useState(name);
  const updateProfile = useUpdateProfile(token);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateProfile.mutate(value, {
      onSuccess: (updated) => {
        toast.success("Profile updated.");
        onUpdated(updated.name);
      },
      onError: () => toast.error("Couldn't update profile. Please try again."),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Your name</CardTitle>
        <CardDescription>This is how you&apos;ll appear across Eventra.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              minLength={2}
              required
            />
          </div>
          <Button type="submit" disabled={updateProfile.isPending || value === name}>
            {updateProfile.isPending ? "Saving…" : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordForm({
  hasPassword,
  token,
}: {
  hasPassword: boolean;
  token: string | undefined;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const changePassword = useChangePassword(token);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    changePassword.mutate(
      { currentPassword: hasPassword ? currentPassword : undefined, newPassword },
      {
        onSuccess: () => {
          toast.success(hasPassword ? "Password changed." : "Password set.");
          setCurrentPassword("");
          setNewPassword("");
        },
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : "Couldn't change password."),
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {hasPassword ? "Change password" : "Set a password"}
        </CardTitle>
        <CardDescription>
          {hasPassword
            ? "Enter your current password to set a new one."
            : "You signed up with Google — set a password to also sign in with email."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {hasPassword && (
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              required
              placeholder="At least 8 characters"
            />
          </div>
          <Button type="submit" disabled={changePassword.isPending}>
            {changePassword.isPending ? "Saving…" : hasPassword ? "Change password" : "Set password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
