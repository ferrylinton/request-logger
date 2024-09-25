
type Props = {
    message: string
}

export default function ErrorMessage({ message }: Props) {
    return (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 pr-4">
            <span className="block sm:inline">{message}</span>
        </div>
    )
}