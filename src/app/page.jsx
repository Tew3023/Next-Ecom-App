import MaxWarp from "@/components/MaxWarp";
import Recom from "./products/Recom";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section>
        <MaxWarp className={"max-w-full px-0 md:px-0"}>
          <div className="bg-red-500 h-full w-full">
            <img src="/bg.jpg" />
          </div>
        </MaxWarp>
      </section>
      <section>
        <MaxWarp className={"w-7/12"}>
          <div className="py-14">
            <div className="flex justify-center text-center text-5xl font-semibold">
              Sustainable Outdoor Essentials
            </div>
            <div className="flex justify-center mt-5 text-xl font-semibold text-center">
              Made with natural and recycled materials. Only a few sizes left.
              Get them before they're gone.
            </div>
          </div>
        </MaxWarp>
      </section>
      <section>
        <MaxWarp className={"max-w-full"}>
          <div className="grid grid-cols-4 gap-4">
            {Recom.map((item) => (
              <Link href={`/collection/${item.collection}`} key={item.id}>
                <img
                  className="w-[335.25px] h-[335.25px] object-cover rounded-sm"
                  src={item.url}
                  alt="shoes"
                />
                <button className="inline-flex items-center text-xl font-semibold mt-4">
                  {item.collection}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
            ))}
          </div>
        </MaxWarp>
      </section>
      <section>
        <MaxWarp className={"w-7/12"}>
          <div className="py-20 space-y-5">
            <div className="flex justify-center text-center text-5xl font-semibold">
              <span className="underline underline-offset-4 decoration-1 mr-2 hover:decoration-2 cursor-pointer">
                Find Your Size.
              </span>{" "}
              <span className="underline underline-offset-4 decoration-1 hover:decoration-2 cursor-pointer">
                Free Shipping.
              </span>
            </div>
            <div className="flex justify-center text-center text-5xl font-semibold ">
              <span className="underline underline-offset-4 decoration-1 cursor-pointer hover:decoration-2">
                Easy Returns.
              </span>
            </div>
          </div>
        </MaxWarp>
      </section>
      <section>
        <MaxWarp className={"max-w-full px-0 md:px-0"}>
          <div className=" h-full w-full">
            <div className="bg-custom-image bg-no-repeat bg-cover w-full h-80">
              <div className="flex justify-center items-center h-full text-white font-semibold flex-col">
                <h1 className="text-5xl mb-3">“Thes-us”</h1>
                <div className="text-center text-2xl mb-3">
                  (a theory, proven by community action)
                </div>
                <div className="text-2xl">
                  We help people connect to themselves, community and the
                  Planet. #BeOutside
                </div>
              </div>
            </div>
          </div>
        </MaxWarp>
      </section>
      <section className="py-16">
        <MaxWarp>
          <div className="grid grid-cols-2">
            <div>
              <img
                className="w-full h-full rounded-sm"
                src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="nature"
              />
            </div>
            <div>
              <div className="flex justify-center items-center h-full flex-col">
                <div className="text-5xl text-center font-semibold">
                  <p>No Virgin Plastic.</p>
                  <p>More Nature. Less Waste.</p>
                </div>
              </div>
            </div>
          </div>
        </MaxWarp>
      </section>
      <section className="py-16">
        <MaxWarp>
          <div className="grid grid-cols-2">
            <div>
              <div className="flex justify-center items-center h-full flex-col">
                <div className="text-center px-10 space-y-5">
                  <div className="flex justify-center gap-0.5">
                    <Star className="h-6 w-6 text-green-600 fill-green-600" />
                    <Star className="h-6 w-6 text-green-600 fill-green-600" />
                    <Star className="h-6 w-6 text-green-600 fill-green-600" />
                    <Star className="h-6 w-6 text-green-600 fill-green-600" />
                    <Star className="h-6 w-6 text-green-600 fill-green-600" />
                  </div>
                  <div className="text-gray-500">
                    "The Weekend Boots have a very nice padding in the sole
                    which makes it comfortable to wear for long periods of time
                    and these shoes definitely fit very true to size."
                  </div>
                  <div className="text-sm text-gray-500">Lainny</div>
                </div>
              </div>
            </div>
            <div>
              <img
                className="w-full h-full rounded-sm"
                src="https://thesusoutdoors.com/cdn/shop/files/2021_Weekend_Boot_Women_Vegan_Susaintable_Allegra_White_1_1.png?v=1713819817&width=900"
                alt="nature"
              />
            </div>
          </div>
        </MaxWarp>
      </section>
    </div>
  );
}
