// import { useState } from "react";
// import { sendResetOtp, resetPasswordWithOtp } from "../lib/api";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const ForgotPasswordPage = () => {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await sendResetOtp(email);
//       toast.success("OTP sent to your email");
//       setStep(2);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await resetPasswordWithOtp({ email, otp, newPassword });
//       toast.success("Password reset successful");
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="max-w-md w-full border p-6 bg-base-100 shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

//         {step === 1 && (
//           <form onSubmit={handleSendOtp} className="space-y-4">
//             <div className="form-control">
//               <label className="label">Enter your registered email</label>
//               <input
//                 type="email"
//                 className="input input-bordered"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <button className="btn btn-primary w-full" disabled={loading}>
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </form>
//         )}

//         {step === 2 && (
//           <form onSubmit={handleResetPassword} className="space-y-4">
//             <div className="form-control">
//               <label className="label">Enter OTP</label>
//               <input
//                 type="text"
//                 className="input input-bordered"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="form-control">
//               <label className="label">New Password</label>
//               <input
//                 type="password"
//                 className="input input-bordered"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button className="btn btn-primary w-full" disabled={loading}>
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordPage;


// pages/ForgotPasswordPage.jsx
import { useState } from "react";
import { sendOtp } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await sendOtp(email);
      toast.success("OTP sent to your email");
      localStorage.setItem("reset-email", email);
      navigate("/verify-otp");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center" data-theme="forest">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-md border border-primary/25">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="text-sm mb-6">Enter your email to receive an OTP</p>

        <form onSubmit={handleSendOtp} className="space-y-4">
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn btn-primary w-full" type="submit" disabled={isSending}>
            {isSending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Sending...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

