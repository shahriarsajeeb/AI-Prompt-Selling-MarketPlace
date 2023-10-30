import UserAllOrders from "./_page";
import { getUser } from "@/actions/user/getUser";

const Page = async () => {
  const userData = await getUser();
  return (
    <div>
      <UserAllOrders user={userData?.user}  isSellerExist={userData?.shop ? true : false} />
    </div>
  );
};

export default Page;
