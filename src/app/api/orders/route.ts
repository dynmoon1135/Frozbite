import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // Import konfigurasi auth

// MEMBUAT PESANAN
export async function POST(req: Request) {
  try {
    // SATPAM 1: Tolak jika tidak login
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Akses Ditolak. Silakan login." }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    
    // SATPAM 2: Paksa email pesanan sesuai dengan email akun yang sedang login
    // Ini mencegah hacker memalsukan pesanan atas nama orang lain
    if (!body.customer) body.customer = {};
    body.customer.email = session.user?.email;

    const newOrder = new Order(body);
    await newOrder.save();

    return NextResponse.json({ message: "Pesanan berhasil dibuat!", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ message: "Gagal membuat pesanan" }, { status: 500 });
  }
}

// MENGAMBIL PESANAN
export async function GET() {
  try {
    // SATPAM 1: Tolak jika tidak login
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Akses Ditolak" }, { status: 401 });
    }

    await connectToDatabase();

    const userRole = (session.user as any)?.role;
    const userEmail = session.user?.email;

    let orders;
    
    // SATPAM 2: Pisahkan Hak Akses
    if (userRole === "admin") {
      // Jika Admin: Ambil SEMUA pesanan
      orders = await Order.find().sort({ createdAt: -1 });
    } else {
      // Jika User Biasa: Ambil HANYA pesanan milik emailnya sendiri
      orders = await Order.find({ "customer.email": userEmail }).sort({ createdAt: -1 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ message: "Gagal mengambil data pesanan" }, { status: 500 });
  }
}