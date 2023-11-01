import ShopSidebar from "@/components/Shop/ShopSidebar";
import AllInvoices from "./_page";
import { sellerInvoices } from "@/actions/withdraws/sellerInvoices";
import { getSellerInfo } from "@/actions/shop/getSellerInfo";

const Page = async () => {
  const data:any = await getSellerInfo();
  const invoices = await sellerInvoices({ sellerId: data && data?.shop?.id! });

  return (
    <div className="flex w-full">
      <div className="h-screen flex p-2 bg-[#111c42] md:w-[20%] 2xl:w-[17%]">
        <ShopSidebar active={4} />
      </div>
      <div className="md:w-[80%] 2xl:w-[83%] p-5">
        <AllInvoices invoices={invoices} />
      </div>
    </div>
  );
};

export default Page;
