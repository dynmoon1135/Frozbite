"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Satpam Frontend: Cek Akses Admin
  useEffect(() => {
    if (status !== "loading" && (session?.user as any)?.role !== "admin") {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status !== "loading" && (session?.user as any)?.role === "admin") {
      fetchOrders();
    }
  }, [status, session]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      
      // Pengaman agar tidak Error .map
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Gagal mengambil pesanan", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchOrders(); 
        alert("Status berhasil diperbarui!");
      } else {
        const errData = await res.json();
        alert(`Gagal: ${errData.message}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem saat mengubah status.");
    }
  };

  const formatRupiah = (price: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);

  if (status === "loading" || (loading && status === "authenticated")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-bold text-slate-600">Mengecek Akses Admin...</p>
        </div>
      </div>
    );
  }

  if ((session?.user as any)?.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Ruang Kendali Admin</h1>
          <button 
            onClick={fetchOrders}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition shadow-sm"
          >
            🔄 Refresh Data
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-b">Invoice & Waktu</th>
                <th className="p-4 font-bold border-b">Pelanggan</th>
                <th className="p-4 font-bold border-b">Pesanan</th>
                <th className="p-4 font-bold border-b">Total</th>
                <th className="p-4 font-bold border-b text-center">Status Pesanan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-slate-400">
                    <div className="flex flex-col items-center">
                      <p className="text-lg font-medium">Belum ada pesanan masuk</p>
                      <p className="text-sm">Data pesanan pelanggan akan muncul di sini.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 align-top">
                      <p className="font-bold text-blue-600">{order.invoice || "INV-XXX"}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {order.createdAt ? formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: id }) : "-"}
                      </p>
                    </td>
                    <td className="p-4 align-top">
                      <p className="font-semibold text-slate-800">{order.customer?.name || 'Anonim'}</p>
                      <p className="text-sm text-slate-500">{order.customer?.email || '-'}</p>
                      <p className="text-sm text-slate-500">{order.customer?.phone || '-'}</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                        {order.customer?.address || '-'}
                      </p>
                    </td>
                    <td className="p-4 align-top">
                      <ul className="text-sm text-slate-600 space-y-1">
                        {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                          <li key={idx} className="flex justify-between gap-4">
                            <span>{item.name}</span>
                            <span className="font-bold text-slate-400">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 align-top">
                      <p className="font-bold text-slate-800">{formatRupiah(order.total)}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 rounded uppercase">
                        {order.customer?.method || 'Transfer'}
                      </span>
                    </td>
                    <td className="p-4 text-center align-top">
                      <select 
                        value={order.status || "Menunggu Konfirmasi"}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`text-xs font-bold rounded-full px-4 py-2 border outline-none cursor-pointer transition-all ${
                          order.status === "Menunggu Konfirmasi" ? "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100" :
                          order.status === "Diproses" ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100" :
                          "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                        }`}
                      >
                        <option value="Menunggu Konfirmasi">⏳ Menunggu</option>
                        <option value="Diproses">📦 Diproses</option>
                        <option value="Sedang Dikirim">🚚 Dikirim</option>
                        <option value="Selesai">✅ Selesai</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}