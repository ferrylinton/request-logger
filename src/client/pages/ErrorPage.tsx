import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col gap-2 w-full px-2 sm:px-0 sm:w-[400px] text-center">
                <h1 className="text-3xl uppercase font-bold">Error</h1>
                <p className="text-xl">{error.status || 500} | {error.statusText || 'Error'}</p>
                <p>{ error?.error?.message || error?.message || 'Unexpected error has occurred'}</p>
                <Link to={'/'} className="pt-5 underline underline-offset-4 uppercase hover:text-blue-700">Go To Home Page</Link>
            </div>
        </div>
    );
}