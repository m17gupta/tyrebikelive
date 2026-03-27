'use client';

import { useState, useEffect } from 'react';
import { Truck, Package, Clock, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const params = statusFilter ? `?status=${statusFilter}` : '';
        fetch(`/api/ecommerce/orders${params}`)
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setOrders(data); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [statusFilter]);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const processingCount = orders.filter(o => o.status === 'processing').length;

    const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
        pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
        processing: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
        delivered: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
        cancelled: { icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
    };

    const paymentColors: Record<string, string> = {
        paid: 'text-emerald-600',
        awaiting: 'text-amber-600',
        failed: 'text-rose-600',
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-slate-50 min-h-screen p-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                    <Truck size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Orders Dashboard</h2>
                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">Track and manage customer orders</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-emerald-50">
                            <DollarSign size={20} className="text-emerald-600" />
                        </div>
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Total Revenue</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">${totalRevenue.toFixed(2)}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-amber-50">
                            <Clock size={20} className="text-amber-600" />
                        </div>
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Pending</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{pendingCount}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-blue-50">
                            <Package size={20} className="text-blue-600" />
                        </div>
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Processing</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{processingCount}</div>
                </div>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
                {['', 'pending', 'processing', 'delivered', 'cancelled'].map(s => (
                    <button key={s} onClick={() => setStatusFilter(s)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${statusFilter === s ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                        {s || 'All Orders'}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 text-sm font-medium">Fetching orders...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-500 text-sm font-medium">No orders found.</div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {orders.map(order => {
                        const cfg = statusConfig[order.status] || statusConfig.pending;
                        const StatusIcon = cfg.icon;
                        return (
                            <div key={order._id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all group">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${cfg.bg} shadow-sm transition-transform group-hover:scale-105`}>
                                            <StatusIcon size={22} className={cfg.color} />
                                        </div>
                                        <div>
                                            <div className="font-black text-slate-900 text-base">{order.orderNumber}</div>
                                            <div className="text-xs text-slate-500 font-medium">{order.customer?.name} <span className="mx-1 text-slate-300">•</span> {order.customer?.email}</div>
                                        </div>
                                    </div>
                                    <div className="sm:text-right flex sm:flex-col justify-between items-end sm:items-end">
                                        <div className="text-2xl font-black text-slate-900">${order.total?.toFixed(2)}</div>
                                        <div className={`text-[11px] uppercase tracking-widest font-black px-2 py-1 rounded-md bg-slate-50 border border-slate-100 mt-1 ${paymentColors[order.paymentStatus] || 'text-slate-400'}`}>
                                            {order.paymentStatus}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-50">
                                    {order.items?.map((item: any, i: number) => (
                                        <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs text-slate-600 transition-colors hover:bg-slate-100">
                                            <span className="text-slate-900 font-bold">{item.productName}</span>
                                            {item.variant && <span className="text-slate-400 font-medium ml-1.5">{item.variant}</span>}
                                            <span className="text-slate-500 font-black ml-2 text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-100">×{item.qty}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                        Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                                    </div>
                                    <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${cfg.color} ${cfg.bg}`}>
                                        {order.status}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
