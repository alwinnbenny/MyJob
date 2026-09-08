import { ArrowRight } from "lucide-react";

export const Verification = () => {
  return (
    <section className="w-screen h-screen bg-white overflow-hidden flex flex-col">
      <header className="w-full flex justify-center pt-6">
        <img src="/logo.png" alt="MyJob Logo" className="w-32 object-contain" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="w-full max-w-md px-2">
          <h1 className="text-[32px] font-semibold text-black ">
            Email Verification
          </h1>

          <p className="mt-2 text-[#767F8C]">
            We've sent a verification link to{" "}
            <span className="text-black font-semibold">
              emailaddress@gmail.com
            </span>
            to verify your email address and activate your account.
          </p>
        </div>
        <div className="space-y-5 mt-6">
          <input
            type="number"
            placeholder="Verification Code"
            className="h-12 w-100 border border-secondary rounded-sm px-4 outline-none focus:border-[#0A65CC]"
          />

          {/* Button */}
          <button
            className="w-full h-12 bg-[#0A65CC] text-white rounded-sm flex justify-center items-center gap-3 font-medium hover:bg-blue-700 transition cursor-pointer"
            onClick={() => navigate("/verification")}
          >
            Verify My Account
            <ArrowRight size={20} />
          </button>
        </div>
        <p className="mt-6 gap-9 text-[#767F8C]">
          Didn't recieve any code!{" "}
          <span className="text-[#0A65CC] font-medium cursor-pointer">
            Resend
          </span>
        </p>
      </div>
    </section>
  );
};
