export const Main = ({children,full}) => {
    return <main className={full ? "main-form" : "main-container"}>
                <div className="main-wrapper">
                    {children}
                </div>
            </main>
}
