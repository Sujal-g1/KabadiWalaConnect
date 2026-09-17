const PageContainer = ({ children }) => {
  return (
    <main className="min-w-0 flex-1 overflow-x-hidden">
      <div
        className="
          mx-auto w-full max-w-[1440px]
          px-4 py-5
          sm:px-6 sm:py-6
          lg:px-8 lg:py-8
          xl:px-10
        "
      >
        {children}
      </div>
    </main>
  );
};

export default PageContainer;