import MaxWarp from "@/components/MaxWarp"
const getUsers = async () => {
  const res = await fetch('http://localhost:3000/api/admin/users');
  if (!res.ok) {
    throw new Error('Cannot get users data');
  }
  
  return res.json();
};


const getProducts = async () =>{
  const res = await fetch('http://localhost:3000/api/products')
  if (!res.ok) {
    throw new Error('Cannot get users data');
  }
  
  return res.json();
}


export default async function admin(){
  const usersData = await getUsers();
  const user = usersData.users.filter(item => item.role === 'user')
  const admin = usersData.users.filter(item => item.role === 'admin')
  const productsData = await getProducts();
  const snow = productsData.data.filter(item => item.collection === 'snow')
  const rain = productsData.data.filter(item => item.collection === 'rain')
  const sun = productsData.data.filter(item => item.collection === 'sun')
    return (
      <div>
        <section>
          <MaxWarp className={'max-w-full py-10'}>
           <div className="grid grid-cols-4 gap-4  h-[90vh] ">
              <div className="bg-zinc-100  h-60 rounded-lg p-5 text-black">
                <p className="text-2xl font-semibold ">Users</p>
                <p>Total users : {usersData.users.length}</p>
                <p>users : {user.length}</p>
                <p>admin : {admin.length}</p>
              </div>
              <div className="bg-zinc-100 h-60 rounded-lg p-5 text-black">
              <p className="text-2xl font-semibold ">Products</p>
                <p>Total products : {productsData.data.length}</p>
                <p>Snow : {snow.length}</p>
                <p>Rain : {rain.length}</p>
                <p>Sun : {sun.length}</p>
              </div>
              <div className="bg-gray-100 h-60 rounded-lg p-5 text-black">
                <p className="text-2xl font-semibold ">Orders</p>
              </div>
              <div className="bg-gray-100 h-60 rounded-lg p-5 text-black">
              <p className="text-2xl font-semibold ">total income</p>
                </div>
           </div>
          </MaxWarp>
        </section>
      </div>
    );
}