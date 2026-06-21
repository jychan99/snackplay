export default function Loading() {
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-[#4e4e4e80]">
      <div className="relative w-90 h-3 mb-2 rounded-button bg-white">
        <span className="absolute left-0 h-full w-0 rounded-button bg-gradient bg-linear-to-r from-primary via-[#7c52aa] to-secondary animate-grow-width"></span>
      </div>
      <span className="text-white">로딩중입니다</span>
    </div>
  );
}
