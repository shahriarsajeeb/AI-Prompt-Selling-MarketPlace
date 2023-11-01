"use client";
import { styles } from "@/utils/styles";
import { Button, Input } from "@nextui-org/react";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { addWithDrawMethod } from "@/actions/withdraws/addWithdrawMethod";
import { Shop } from "@/@types/shopTypes";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteWithDrawMethod } from "@/actions/withdraws/deleteWithdrawMethod";
import toast from "react-hot-toast";
import Loader from "@/utils/Loader";
import { addWithdraw } from "@/actions/withdraws/addWithdraw";

interface ChangeEvent<T = HTMLInputElement> {
  target: EventTarget & T;
}

const WithDrawEarning = ({
  shop,
  orders,
  invoices,
}: {
  shop: Shop | undefined | null;
  orders: any;
  invoices: any;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    swiftCode: "",
    bankAddress: "",
  });

  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setOpen(!open);
  };

  const handleCreate = async () => {
    await addWithDrawMethod({
      account_holder_name: formData.accountHolderName,
      bank_name: formData.bankName,
      bank_address: formData.bankAddress,
      account_number: parseInt(formData.accountNumber),
      routing_number: parseInt(formData.routingNumber),
      swift_code: formData.swiftCode,
      sellerId: shop?.id!,
    }).then((res) => {
      setOpen(!open);
      setFormData({
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        routingNumber: "",
        swiftCode: "",
        bankAddress: "",
      });
      window.location.reload();
    });
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteWithDrawMethod(shop?.bank?.id!).then((res) => {
      setLoading(false);
      setOpen(!open);
      toast.success("Withdraw method delete successfully!");
    });
  };

  const totalOrderAmount = orders
    ? orders.reduce(
        (total: number, order: any) => total + order.prompt.price,
        0
      )
    : 0;

  const totalInvoiceAmount = invoices
    ? invoices.reduce(
        (total: number, invoice: any) => total + invoice.amount,
        0
      )
    : 0;

  const totalEarning = totalOrderAmount - totalInvoiceAmount;


  const handleWithdraw = async () => {
    if (totalEarning < 100) {
      toast.error("Withdraw minimum amount is 100$");
    } else {
      await addWithdraw({ sellerId: shop?.id!, amount: totalEarning }).then(
        (res) => {
          window.location.reload();
        }
      );
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center h-screen flex-col">
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full text-center">
            <p className={`${styles.label} !text-2xl text-center`}>
              Withdraw Earning
              <span> (minimum withdraw 100$)</span>
            </p>
            <br />
            <Button
              className={`${styles.button}`}
              color="primary"
              onClick={handleSubmit}
            >
              Withdraw
            </Button>
          </div>
        )}
      </div>
      {open && (
        <div className="w-full flex items-center justify-center fixed top-0 left-0 h-screen bg-[#0000002b]">
          <div className="w-[50%] h-[500px] bg-[#13103c] rounded-xl p-5">
            <div className="w-full flex justify-end">
              <RxCross1
                onClick={() => setOpen(!open)}
                className="text-2xl cursor-pointer"
              />
            </div>
            <p className={`${styles.paragraph} text-center !text-2xl`}>
              Withdraw Method
            </p>
            <br />
            {shop?.bank ? (
              <>
                <div className="flex items-center">
                  <p className={`${styles.label}`}>
                    Account ending with ...
                    {shop?.bank?.account_number.toString().slice(-4)}
                  </p>
                  <AiOutlineDelete
                    className="text-2xl ml-2 !cursor-pointer"
                    onClick={() => handleDelete()}
                  />
                </div>
                <br />
                <Button
                  className={`${styles.button} cursor-pointer`}
                  color="primary"
                  onClick={handleWithdraw}
                >
                  Withdraw Now US${totalEarning}
                </Button>
              </>
            ) : (
              <div className="w-full text-center">
                <form>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="accountHolderName"
                        className="w-full text-left block py-2 pl-1"
                      >
                        Account Holder Name
                      </label>
                      <Input
                        id="accountHolderName"
                        name="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={handleInputChange}
                        variant="bordered"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bankName"
                        className="w-full text-left block py-2 pl-1"
                      >
                        Bank Name
                      </label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        variant="bordered"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="accountNumber"
                        className="w-full text-left block py-2 pl-1"
                      >
                        Account Number
                      </label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        type="number"
                        variant="bordered"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="routingNumber"
                        className="w-full text-left block py-2 pl-1"
                      >
                        Routing Number
                      </label>
                      <Input
                        id="routingNumber"
                        name="routingNumber"
                        value={formData.routingNumber}
                        onChange={handleInputChange}
                        variant="bordered"
                        type="number"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="swiftCode"
                        className="w-full text-left block py-2 pl-1"
                      >
                        Swift Code
                      </label>
                      <Input
                        id="swiftCode"
                        name="swiftCode"
                        value={formData.swiftCode}
                        onChange={handleInputChange}
                        type="number"
                        variant="bordered"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bankAddress"
                        className="w-full text-left block py-2 pl-1"
                      >
                        Bank Address
                      </label>
                      <Input
                        id="bankAddress"
                        name="bankAddress"
                        value={formData.bankAddress}
                        onChange={handleInputChange}
                        variant="bordered"
                      />
                    </div>
                  </div>
                  <br />
                  <Button
                    className={`${styles.button}`}
                    color="primary"
                    onClick={handleCreate}
                  >
                    Add Withdraw method
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WithDrawEarning;
