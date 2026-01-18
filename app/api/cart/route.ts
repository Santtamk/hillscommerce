import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { items } = await req.json();

    const { error } = await supabase
      .from('carts')
      .upsert({ user_id: userId, items }, { onConflict: 'user_id' });

    if (error) throw error;

    return NextResponse.json({ message: "Cart synced" });
  } catch (error) {
    console.error("Cart Sync Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "The result contains 0 rows"
       console.error("Supabase Cart Fetch Error:", error);
    }

    return NextResponse.json({ items: data?.items || [] });
  } catch (error) {
    console.error("Cart Fetch Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
