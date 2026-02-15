import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validasi input dasar
    if (!name || !email || !password || password.length < 6) {
      return NextResponse.json(
        { message: "Semua kolom wajib diisi dan password minimal 6 karakter!" }, 
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar! Silakan Login." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // KEAMANAN KETAT: Paksa role menjadi "user" secara hardcode. 
    // Mencegah hacker mengirimkan JSON { "role": "admin" }
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user" 
    });
    await newUser.save();

    return NextResponse.json({ message: "Registrasi berhasil!" }, { status: 201 });
  } catch (error) {
    console.error("Error Register:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}