system("killall Rserve")
Rserve::Rserve(
    args = c(
        "--RS-conf", "demo/server/rserve.conf",
        "--RS-source", "demo/server/init.R",
        "--vanilla",
        "--no-save",
        "--silent"
    )
)