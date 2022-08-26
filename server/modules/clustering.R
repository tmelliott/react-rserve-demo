# clustering module
cluster_plot <- function(clusters = 3) {
    message("Clustering with n = ", clusters, " clusters")
    t <- tempfile(fileext = ".png")
    png(file = t)

    km <- try(kmeans(data, clusters))
    if (inherits(km, "try-error")) {
        message("Failed ...")
        print(head(data))
        print(clusters)
        return("")
    }
    plot(data[[1]], data[[2]],
    col = km$cluster,
    pch = 19,
    cex = 2,
    xlab = names(data)[1],
    ylab = names(data)[2]
    )
    points(km$centers, pch = 4, cex = 4, lwd = 4)
    dev.off()
    on.exit(unlink(t))

    txt <- RCurl::base64Encode(
    readBin(t, "raw", file.info(t)[1, "size"]),
    "txt"
    )

    return(sprintf("data:image/png;base64,%s", txt))
}
