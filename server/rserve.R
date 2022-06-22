# source('init.R')

system("killall Rserve")

port <- Sys.getenv("PORT")
if (port == "") port <- "8081"

message("Connected to PORT:", port)

Rserve::Rserve(
    args = c(
        "--RS-conf", "rserve.conf",
        "--RS-source", "init.R",
        "--RS-port", port,
        "--vanilla",
        "--no-save",
        "--silent"
    )
)
