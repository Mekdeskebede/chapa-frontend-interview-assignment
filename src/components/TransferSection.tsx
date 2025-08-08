import { useEffect, useState } from "react";
import {
  checkTransferStatus,
  initializeTransfer,
} from "@/services/transferService";
import { fetchBanks } from "@/services/bankService";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import {
  ArrowUpDown,
  User,
  DollarSign,
  Building2,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  ShieldCheck,
  CreditCard,
  Calendar,
  Clock,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  interface TransferDetails {
    status: string;
    reference: string;
    amount: string;
    currency: string;
    account_number: string;
    bank_name: string;
    bank_code: string;
    created_at: string;
    updated_at: string;
    description: string;
    fee: string;
    total_amount: string;
    account_name: string;
    transfer_method: string;
    mode: string;
    chapa_transfer_id: string;
  }
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [errorBanks, setErrorBanks] = useState("");
  const [statusResult, setStatusResult] = useState<string>("");
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [reference, setReference] = useState("");
  const [verifyResult, setVerifyResult] = useState("");
  const [transferDetails, setTransferDetails] = useState<TransferDetails | null>(null);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const searchParams = useSearchParams();
  const ref_param = searchParams.get("ref_param");

  useEffect(() => {
    if (ref_param) {
      setReference(ref_param);
      setTransferDetails(null);
      setVerifyResult("");
    }
  }, [ref_param]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusResult("");
    setLoadingTransfer(true);
    const ref_number = Math.random().toString(36).substring(2, 15);
    // setReference(ref_number);

    try {
      const result = await initializeTransfer({
        account_number: transferForm.account_number,
        amount: Number(transferForm.amount),
        bank_code: transferForm.bank_code,
        currency: "ETB",
        reference: ref_number,
      });

      showToast("Transfer initialized! Reference: " + ref_number, "success");

      setTransferForm({
        account_number: "",
        amount: "",
        bank_code: "",
      });
      setReference(ref_number);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to initialize transfer";
      showToast(msg, "error");
      setStatusResult(msg);
    }
    setLoadingTransfer(false);
  };

  const handleVerify = async () => {
    if (!reference) return;
    setLoadingVerify(true);
    setVerifyResult("");
    setTransferDetails(null);

    try {
      const result = await checkTransferStatus(reference);

      const mappedTransferDetails = {
        status: result.data?.status || result.status || "unknown",
        reference: result.data?.tx_ref || reference,
        amount: result.data?.amount?.toString() || "0.00",
        currency: result.data?.currency || "ETB",
        account_number: result.data?.account_number || "N/A",
        bank_name: result.data?.bank_name || "N/A",
        bank_code: result.data?.bank_code?.toString() || "N/A",
        created_at: result.data?.created_at || new Date().toISOString(),
        updated_at: result.data?.updated_at || new Date().toISOString(),
        description: result.data?.narration || "Bank transfer",
        fee: result.data?.charge?.toString() || "0.00",
        total_amount: result.data?.amount?.toString() || "0.00",
        account_name: result.data?.account_name || "N/A",
        transfer_method: result.data?.transfer_method || "bank",
        mode: result.data?.mode || "live",
        chapa_transfer_id: result.data?.chapa_transfer_id || "N/A",
      };

      setVerifyResult("Transfer verified successfully");
      setTransferDetails(mappedTransferDetails);
    } catch (err) {
      setVerifyResult("Failed to verify transfer");
      console.log(err);
    } finally {
      setLoadingVerify(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (ref_param) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Transfer
          </h2>
          <p className="text-gray-600 text-sm">
            Verify your bank transfer transaction
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">
              Transfer Reference
            </span>
          </div>
          <p className="text-blue-900 font-mono text-sm break-all">
            {reference}
          </p>
        </div>

        <Button
          onClick={handleVerify}
          loading={loadingVerify}
          className="w-full mb-6"
        >
          Verify Transfer
        </Button>

        {verifyResult && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm font-medium">{verifyResult}</p>
          </div>
        )}

        {transferDetails && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Transfer Status
              </h3>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    transferDetails.status
                  )}`}
                >
                  {transferDetails.status?.toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">Bank Transfer</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Link href="/dashboard/superadmin/transfer-initialization">
            <button className="w-full cursor-pointer text-sm text-gray-600 hover:text-blue-600 transition-colors">
              ← Back to Transfer Form
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      {/* Reference Display */}
      {reference && (
        <Link
          href={`/dashboard/superadmin/transfer-initialization?ref_param=${reference}`}
        >
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-green-800 mb-1">
                  Transfer Initialized Successfully!
                </h3>
                <p className="text-xs text-green-700">
                  Reference:{" "}
                  <span className="font-mono font-bold">{reference}</span>
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Click to verify transfer
                </p>
              </div>
              <div className="text-green-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <ArrowUpDown className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Transfer Funds</h2>
          <p className="text-sm text-gray-600">
            Initialize a new bank transfer
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Enter account number"
              value={transferForm.account_number}
              onChange={(e) =>
                setTransferForm((f) => ({
                  ...f,
                  account_number: e.target.value,
                }))
              }
              required
              className="pl-10"
            />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type="number"
              placeholder="Enter amount"
              value={transferForm.amount}
              onChange={(e) =>
                setTransferForm((f) => ({
                  ...f,
                  amount: e.target.value,
                }))
              }
              required
              className="pl-10"
            />
          </div>
        </div>

        {/* Bank Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Bank
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="w-5 h-5 text-gray-400" />
            </div>
            {loadingBanks ? (
              <div className="flex items-center justify-center h-12 bg-gray-50 border border-gray-300 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600">
                    Loading banks...
                  </span>
                </div>
              </div>
            ) : errorBanks ? (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-sm text-red-600">{errorBanks}</span>
              </div>
            ) : (
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                  Choose a bank
                </option>
                {banks
                  .filter((bank: Bank) => bank.id && !isNaN(Number(bank.id)))
                  .map((bank: Bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name} ({bank.code})
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            loading={loadingTransfer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {loadingTransfer ? "Initializing..." : "Initialize Transfer"}
          </Button>
        </div>
      </form>

      {/* Status Result */}
      {statusResult && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-800">{statusResult}</p>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-blue-100 rounded-full">
            <Info className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-1">
              Transfer Information
            </h4>
            <p className="text-xs text-gray-600">
              Please ensure all details are correct before proceeding. Transfer
              reference will be provided upon successful initialization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
