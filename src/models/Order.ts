import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    invoice: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true }, // Untuk tahu siapa yang beli
    items: { type: Array, required: true }, // Daftar belanjaan
    total: { type: Number, required: true },
    status: { 
    type: String, 
    default: "Menunggu Konfirmasi",
    enum: ["Menunggu Konfirmasi", "Diproses", "Sedang Dikirim", "Selesai"] // Tambahkan "Selesai"
    },
    customer: {
      name: String,
      phone: String,
      address: String,
      method: String,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);