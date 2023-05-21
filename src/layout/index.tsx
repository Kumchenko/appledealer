import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

export function Layout({children}: React.PropsWithChildren) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}