"use server";
import MaxWarp from "@/components/MaxWarp";
import Recom from "@/app/products/Recom";
import Link from "next/link";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const getData = async (collection) => {
  if (collection === "All-weather") {
    collection = "";
  }
  const res = await fetch(`http://localhost:3000/api/products?collection=${collection}`);
  if (!res.ok) {
    throw new Error("cannot fetch");
  }
  return res.json();
};

export default async function SelectedCollection({ params }) {
  const data = await getData(params.collection); // Await the data fetching
  const filterRECOM = Recom.filter(item => item.collection === params.collection)[0];
  const Length = data.data ? data.data.length : 0;

  return (
    <div>
      <section>
        <MaxWarp className="max-w-full px-0 md:px-0">
          <div className="bg-custom-image bg-no-repeat bg-cover bg-center w-full h-[70vh]">
            <div className="flex justify-center items-center h-full flex-col space-y-10">
              {filterRECOM ? (
                <>
                  <div className="text-5xl font-semibold text-white">
                    {filterRECOM.description}
                  </div>
                  <div className="text-2xl text-white">{filterRECOM.des}</div>
                </>
              ) : (
                <div className="text-5xl font-semibold text-white">
                  Collection not found
                </div>
              )}
            </div>
          </div>
        </MaxWarp>
      </section>
      <section>
        <MaxWarp>
          <div className="h-20 font-light text-zinc-600">
            <div className="flex justify-between h-full items-center">
              <div>Filter:</div>
              <div className="flex">
                <div>{Length} products</div>
              </div>
            </div>
          </div>
        </MaxWarp>
      </section>
      <section>
        <MaxWarp>
          <div className="grid grid-cols-4 gap-2">
            {data.data.map((item, index) => (
              <Link
                className="h-66 pb-5"
                href={`/products/${encodeURIComponent(item.name)}`}
                key={index}
              >
                <div className="">
                  <img
                    className="w-full h-full"
                    src={item.url}
                    alt={item.name}
                  />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-md font-light">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </MaxWarp>
      </section>
    </div>
  );
}
