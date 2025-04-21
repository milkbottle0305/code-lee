"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/auth-provider";

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not logged in
  if (!isLoading && !user) {
    router.push("/login");
    return null;
  }

  if (isLoading || !user) {
    return (
      <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const success = await updateProfile({ name, bio });

      if (success) {
        toast({
          title: "프로필 업데이트 성공",
          description: "프로필 정보가 성공적으로 업데이트되었습니다.",
        });
      } else {
        toast({
          title: "프로필 업데이트 실패",
          description:
            "프로필 업데이트 중 문제가 발생했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description:
          "프로필 업데이트 중 문제가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback className="text-4xl">
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">
            가입일: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">프로필 개요</TabsTrigger>
            <TabsTrigger value="edit">프로필 수정</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>활동 통계</CardTitle>
                  <CardDescription>코드 리뷰 활동 통계입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                      <span className="text-3xl font-bold text-primary">
                        {user.reviewCount}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        작성한 리뷰
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                      <span className="text-3xl font-bold text-primary">
                        {user.problemCount}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        등록한 문제
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>사용자 정보</CardTitle>
                  <CardDescription>기본 사용자 정보입니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-medium">이메일:</span> {user.email}
                  </div>
                  <div>
                    <span className="font-medium">역할:</span>{" "}
                    {user.role === "admin" ? "관리자" : "일반 사용자"}
                  </div>
                  <div>
                    <span className="font-medium">소개:</span>{" "}
                    {user.bio || "소개가 없습니다."}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>프로필 수정</CardTitle>
                <CardDescription>프로필 정보를 수정합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSaving}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      value={user.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      이메일은 변경할 수 없습니다.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">소개</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      disabled={isSaving}
                      placeholder="자기소개를 입력하세요"
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSaving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    저장하기
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
