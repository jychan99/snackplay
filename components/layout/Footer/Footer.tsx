export default function Footer() {
  return (
    <footer className="flex items-center justify-center py-12 border-t-1 border-border-sub">
      <div className="flex items-center justify-between w-[640px] flex-wrap px-8">
        <div>
          <h2 className="text-[18px] font-bold">SnackPlay</h2>
          <p className="text-text-sub text-[12px]">
            © 2026 SnackPlay. All rights reserved.
          </p>
        </div>
        <div className="flex relative -right-4 max-[480px]:right-3">
          <button
            className="text-text-sub text-[12px] underline underline-offset-1 px-4 py-2 hover:font-bold transition ease-linear"
            type="button"
          >
            개인정보보호
          </button>
          <button
            className="text-text-sub text-[12px] underline underline-offset-1 px-4 py-2 hover:font-bold transition ease-linear"
            type="button"
          >
            이용약관
          </button>
          <button></button>
        </div>
      </div>
    </footer>
  );
}
