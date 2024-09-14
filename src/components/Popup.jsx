'use client'
import { useSelector, useDispatch } from "react-redux";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { setName,setPrice,setUrl } from "@/app/store/counterSlice";


export default function Popup() {
    const dispatch = useDispatch();
  const data = useSelector((state) => state.counter.data);

  const closePopup = () => {
    dispatch(setName(''))
    dispatch(setPrice(0))
    dispatch(setUrl(''))
  }

  return (
    <div>
      {data.url && data.name && (
        <div className="w-80 sticky top-0 right-0  z-[99] bg-white border py-5 px-4 space-y-4 rounded-b-lg">
          <div className="flex justify-between text-left">
            <div className="flex">
              <Check className="w-5 h-5" />
              <span>Item added to your cart</span>
            </div>
            <div><X className="w-5 h-5 cursor-pointer" onClick={closePopup} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img src={data.url} alt={data.name} />
            </div>
            <div className="flex flex-col">
              <p>{data.name}</p>
              <p>{data.price}</p>
            </div>
          </div>
          <Link
            href="/cart"
            className="px-4 py-2 flex justify-center bg-black text-white rounded-full"
          >
            View cart
          </Link>
          <Link
            href="/"
            onClick={closePopup}
            className="px-3 py-2 flex justify-center underline underline-offset-4"
          >
            continue shopping
          </Link>

        </div>
)}
    </div>
  );
}
