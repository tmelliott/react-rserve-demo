system("killall Rserve")
Rserve::Rserve(
    args = c(
        "--RS-conf", "rserve.conf",
        "--RS-source", "init.R",
        "--vanilla",
        "--no-save",
        "--silent"
    )
)
