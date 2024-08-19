"use client";
import { Trash2,Plus,Minus } from "lucide-react";
export default function QuatityEdit({ quantity }) {
  return (
    <div className="text-zinc-500 flex items-center space-x-5">
      <div className="flex items-center space-x-10 border border-zinc-500 p-3">
        <button><Minus className="w-4 h-4" /></button>
        <p>{quantity}</p>
        <button><Plus className="w-4 h-4" /></button>
      </div>
      <Trash2 className="w-4 h-4" />
    </div>
  );
}
