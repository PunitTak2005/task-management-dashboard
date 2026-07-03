import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const taskUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const parsed = taskUpdateSchema.parse(data);
    const updated = await prisma.task.update({
      where: { id: Number(id) },
      data: parsed,
    });
    return NextResponse.json(updated);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.task.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
}
