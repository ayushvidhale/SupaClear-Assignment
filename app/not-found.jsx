import Link from "next/link";

export default function Error() {
  return (
    <main className="flex items-center justify-center overflow-hidden h-full w-full bg-navbarDark text-gray-50">
      <div className="p-4 space-y-4 md:space-y-8  my-auto">
        <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
          <p className="font-semibold text-danger-light text-9xl text-red-500">
            404
          </p>
          <div className="space-y-2">
            <h1 id="pageTitle" className="flex items-center space-x-2">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-danger-light text-danger"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <span className="text-xl font-medium  sm:text-2xl text-gray-50">
                Oops! Page not found.
              </span>
            </h1>
            <p className="text-base font-normal  text-gray-300">
              The page you are looking for was not found.
            </p>
            <p className="text-base font-normal  text-gray-300">
              You may return to{" "}
              <Link href={"/"} className=" hover:underline text-blue-500">
                home page
              </Link>{" "}
              or try using the search form.
            </p>
          </div>
        </div>

        <form action="#" method="POST">
          <div className="flex items-center justify-center">
            <input
              type="text"
              name="search"
              placeholder="What are you looking for?"
              className="w-full px-4 py-2  text-black rounded-l-md focus:outline-none focus:ring focus:ring-primary-light dark:bg-darker dark:focus:ring-primary-darker"
            />
            <button className="p-2 text-gray-50 rounded-r-md bg-indigo-600 dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-darker focus:outline-none focus:ring focus:ring-primary-light dark:focus:ring-primary-darker">
              <span className="sr-only">Search</span>
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
