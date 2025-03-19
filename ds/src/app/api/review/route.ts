import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const reviews = await prisma.review.findMany();
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newReview = await prisma.review.create({ data: body });
  return NextResponse.json(body);
  // return NextResponse.json(newUser);
}