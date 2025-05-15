export default function Errors({children}: {children: React.ReactNode}) {
  return (
    <p className="text-white bg-red-600 p-1 m-1 uppercase font-bold text-center">{children}</p>
  )
}
