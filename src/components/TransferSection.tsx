import { useEffect, useState } from "react";
import { initializeTransfer } from "@/services/transferService";
import { fetchBanks } from "@/services/bankService";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { toast } from "react-toastify";

export default function TransferSection() {
    const [transferForm, setTransferForm] = useState({
        account_number: "",
        amount: "",
        bank_code: "",
    });
    interface Bank {
        id: number;
        name: string;
        code: string;
    }
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loadingBanks, setLoadingBanks] = useState(true);
    const [errorBanks, setErrorBanks] = useState("");
    const [statusResult, setStatusResult] = useState<string>("");
    const [loadingTransfer, setLoadingTransfer] = useState(false);
    useEffect(() => {
        fetchBanks()
            .then((data) => {
                setBanks(data || []);
                setLoadingBanks(false);
            })
            .catch(() => {
                setErrorBanks("Failed to load banks");
                setLoadingBanks(false);
            });
    }, []);

    // ...existing code...
    const showToast = (msg: string, type: "success" | "error") => {
        toast[msg && type === "success" ? "success" : "error"](msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };
    return (
        <div className="mb-8 rounded-xl bg-white shadow p-6 max-w-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Transfer Initialization
            </h2>
            <form
                className="flex flex-col md:flex-row gap-4 items-center"
                onSubmit={async (e) => {
                    e.preventDefault();
                    setLoadingTransfer(true);

                    try {
                        const result = await initializeTransfer({
                            account_number: transferForm.account_number,
                            amount: Number(transferForm.amount),
                            bank_code: transferForm.bank_code,
                        });
                        const ref = result.data?.reference;

                        showToast(
                            "Transfer initialized! Reference: " + ref,
                            "success"
                        );
                    } catch (err) {
                        const msg = "Failed to initialize transfer";

                        showToast(msg, "error");
                        console.log(err);
                    }
                    setLoadingTransfer(false);
                }}
            >
                <div className="flex flex-col gap-4 w-full">
                    <Input
                        type="text"
                        placeholder="Account Number"
                        value={transferForm.account_number}
                        onChange={(e) =>
                            setTransferForm((f) => ({
                                ...f,
                                account_number: e.target.value,
                            }))
                        }
                        required
                        className=""
                    />
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={transferForm.amount}
                        onChange={(e) =>
                            setTransferForm((f) => ({
                                ...f,
                                amount: e.target.value,
                            }))
                        }
                        required
                        className=""
                    />
                    {loadingBanks ? (
                        <div className="text-blue-500">Loading banks...</div>
                    ) : errorBanks ? (
                        <div className="text-red-500">{errorBanks}</div>
                    ) : (
                        <select
                            className="p-2 border rounded-full w-full text-sm"
                            value={transferForm.bank_code}
                            onChange={(e) =>
                                setTransferForm((f) => ({
                                    ...f,
                                    bank_code: e.target.value,
                                }))
                            }
                            required
                        >
                            <option value="" disabled>
                                Select Bank
                            </option>
                            {banks
                                .filter(
                                    (bank: Bank) =>
                                        bank.id && !isNaN(Number(bank.id))
                                )
                                .map((bank: Bank) => (
                                    <option key={bank.id} value={bank.id}>
                                        {bank.name} ({bank.code})
                                    </option>
                                ))}
                        </select>
                    )}
                    <Button
                        type="submit"
                        loading={loadingTransfer}
                        className=""
                    >
                        Initialize
                    </Button>
                </div>
            </form>
            {/* {transferStatus && (
                <p className="mt-2 text-sm text-gray-700">{transferStatus}</p>
            )} */}
            {/* Transfer Status Check */}
            {/* <form
                className="flex flex-col md:flex-row gap-4 items-center mt-4"
                onSubmit={async (e) => {
                    e.preventDefault();
                    setLoadingStatus(true);
                    setStatusResult("");
                    try {
                        const result = await checkTransferStatus(
                            transferReference
                        );
                        setStatusResult(
                            "Status: " + (result.data?.status || "Unknown")
                        );
                    } catch (err: any) {
                        setStatusResult(
                            "Error: " +
                                (err.message || "Failed to check status")
                        );
                    }
                    setLoadingStatus(false);
                }}
            >
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <Input
                        type="text"
                        placeholder="Transfer Reference"
                        value={transferReference}
                        onChange={(e) => setTransferReference(e.target.value)}
                        required
                        className="md:w-64"
                    />
                    <Button
                        type="submit"
                        loading={loadingStatus}
                        className="md:w-32 min-w-[120px]"
                    >
                        Check Status
                    </Button>
                </div>
            </form> */}
            {statusResult && (
                <p className="mt-2 text-sm text-gray-700">{statusResult}</p>
            )}
        </div>
    );
}
