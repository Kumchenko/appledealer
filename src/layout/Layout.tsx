import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { ForwardedRef } from "react"

export default function Layout({ children }: React.PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}