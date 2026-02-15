import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // SATPAM 1: Pastikan yang mengakses adalah Admin yang sah
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ message: "Akses Ilegal: Hanya Admin yang diizinkan." }, { status: 403 });
    }

    await connectToDatabase();
    
    const { id } = await params; 
    const { status } = await req.json();

    // Validasi agar status tidak diisi dengan teks sembarangan oleh hacker
    const validStatuses = ["Menunggu Konfirmasi", "Diproses", "Sedang Dikirim", "Selesai"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Status tidak valid" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Status berhasil diubah", order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ message: "Gagal mengubah status" }, { status: 500 });
  }
}