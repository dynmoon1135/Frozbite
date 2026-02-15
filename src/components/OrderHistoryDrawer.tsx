"use client";
import { useState, useEffect } from "react";
import { X, Package, Clock, CheckCircle2, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function OrderHistoryDrawer() {
  const { isHistoryOpen, setIsHistoryOpen } = useCart();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"aktif" | "selesai">("aktif");

  // Ambil data terbaru dari API setiap kali Drawer dibuka
  useEffect(() => {
    if (isHistoryOpen) {
      fetchUserOrders();
    }
  }, [isHistoryOpen]);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders"); 
      const data = await res.json();
      
      // Pengaman Tambahan: Pastikan data yang masuk state benar-benar Array
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.warn("API tidak mengembalikan Array:", data);
        setOrders([]); // Set array kosong agar tidak error
      }
    } catch (error) {
      console.error("Gagal mengambil riwayat:", error);
      setOrders([]); // Set array kosong jika fetch gagal total
    } finally {
      setLoading(false);
    }
  };

  // SABUK PENGAMAN: Pastikan orders adalah Array sebelum di-filter
  const safeOrders = Array.isArray(orders) ? orders : [];
  
  // Filter Pesanan menggunakan data yang sudah aman
  const activeOrders = safeOrders.filter(o => o.status !== "Selesai");
  const completedOrders = safeOrders.filter(o => o.status === "Selesai");

  if (!isHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsHistoryOpen(false)} />
      
      {/* Drawer Content */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Riwayat Pesanan</h2>
          <button onClick={() => setIsHistoryOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Tab Kategori */}
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab("aktif")}
            className={`flex-1 py-3 text-sm font-bold transition ${activeTab === "aktif" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" : "text-slate-400"}`}
          >
            Pesanan Aktif ({activeOrders.length})
          </button>
          <button 
            onClick={() => setActiveTab("selesai")}
            className={`flex-1 py-3 text-sm font-bold transition ${activeTab === "selesai" ? "text-green-600 border-b-2 border-green-600 bg-green-50/50" : "text-slate-400"}`}
          >
            Selesai ({completedOrders.length})
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {loading ? (
            <div className="text-center py-10 text-slate-500">Memperbarui status...</div>
          ) : (
            (activeTab === "aktif" ? activeOrders : completedOrders).map((order) => (
              <div key={order._id || order.invoice} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Invoice</p>
                    <p className="font-bold text-blue-600">{order.invoice || "INV-XXX"}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                    order.status === "Selesai" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                  }`}>
                    {order.status || "Diproses"}
                  </span>
                </div>

                <div className="space-y-2 border-t pt-3">
                  {/* Pengaman untuk items agar tidak error map */}
                  {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-slate-600">{item.name} <b className="text-slate-400">x{item.quantity}</b></span>
                      <span className="font-semibold text-slate-800">Rp {(item.price || 0).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t flex justify-between items-center">
                  <p className="text-xs text-slate-400">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('id-ID') : '-'}
                  </p>
                  <p className="font-bold text-slate-900">Total: Rp {(order.total || 0).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}

          {/* Handling State Kosong */}
          {((activeTab === "aktif" ? activeOrders : completedOrders).length === 0 && !loading) && (
            <div className="text-center py-20">
              <Package className="mx-auto text-slate-200 mb-2" size={48} />
              <p className="text-slate-400 text-sm">Tidak ada pesanan di kategori ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}