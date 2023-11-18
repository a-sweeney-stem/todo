import { NextRequest, NextResponse } from "next/server";
import { Task as TaskType } from "@/database/schema";

export type APIResponse = Promise<
  NextResponse<{
    message: string;
    tasks: TaskType[];
  }>
>;

export type APIErrorResponse = Promise<NextResponse<{ error: unknown }>>;
