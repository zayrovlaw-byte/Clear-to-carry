import { NextResponse } from "next/server";
import { currentStaff } from "@/lib/auth";
import { runReminders, remindNow } from "@/lib/reminders";

/* POST {}            -> run the reminder pass now (ignores the 9am–7pm window)
   POST { id }        -> send this client's applicable reminder immediately */
export async function POST(req) {
  const staff = await currentStaff();
  if (!staff) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (id) {
    const kind = await remindNow(id, staff);
    return kind ? NextResponse.json({ ok: true, kind }) : NextResponse.json({ error: "Nothing to remind this client about, or reminders are paused." }, { status: 400 });
  }
  const sent = await runReminders({ ignoreHours: true, by: staff });
  return NextResponse.json({ ok: true, sent });
}
