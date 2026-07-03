import prisma from '@/src/prisma/client';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
});

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = taskSchema.parse(json);
    const newTask = await prisma.task.create({
      data: {
        title: parsed.title,
        description: parsed.description,
        status: parsed.status ?? 'TODO',
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
