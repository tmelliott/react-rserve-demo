source('init.R')

port <- Sys.getenv("PORT")
port <- "8081"

message("Connected to PORT:", port)

Rserve::run.Rserve(
    port = port,
    websockets.port = port,
    debug = TRUE,
    args = NULL,
    config.file = "rserve.conf"
)
