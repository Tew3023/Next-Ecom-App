"use server";
import MaxWarp from "@/components/MaxWarp";
import Link from "next/link";
import AddToCart from "@/components/ui/AddToCart";

async function getData() {
  const res = await fetch("http://localhost:3000/api/products");
  if (!res.ok) {
    throw new Error("Cannot fetch data");
  }
  return res.json();
}

export default async function Selected({ params }) {

  const name = decodeURIComponent(params.name);
  const response = await getData();
  const data = response.data;

  const filteredData = Array.isArray(data)
    ? data.filter((item) => item.name === name)
    : [];

  const collectionFilter = Array.isArray(data)
    ? data.filter((item) => item.collection === filteredData[0]?.collection)
    : [];
  const finalFilter = Array.isArray(collectionFilter)
  ? collectionFilter.filter((item) => item.name !== name)
  : [];

  return (
    <div>
      <MaxWarp className={"mt-10"}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex justify-center">
              <img
                className="rounded-sm"
                src={filteredData[0]?.url}
                alt={filteredData[0]?.name}
              />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-extralight text-zinc-500">THESUS</p>
            <p className="text-4xl font-semibold ">{name}</p>
            <p className="">{filteredData[0]?.price}</p>
            <p className="text-md">Options</p>
            <div className="grid grid-cols-5 gap-2">
              {finalFilter.map((item, index) => (
                <Link href={`/products/${item.name}`} key={index}>
                  <img className="rounded-sm" src={item.url} alt={item.name} />
                </Link>
              ))}
            </div>
            <p className="text-sm">Size</p>
            <AddToCart filteredData={filteredData[0]} />
          </div>
        </div>
      </MaxWarp>
    </div>
  );
}