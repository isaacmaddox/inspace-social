import { getSession } from "@/_actions/auth";
import { NextResponse } from "next/server";

export async function GET() {
   const session = await getSession();
   return NextResponse.json(session);
}
