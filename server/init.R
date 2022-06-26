pkgs <- c("RCurl")

for (pkg in pkgs) {
  if (!requireNamespace(pkg, quietly = TRUE)) {
    install.packages(pkg, repos = "https://cran.rstudio.com")
  }
}

wrap.js.fun <- function(s)
{
  if (class(s) != "javascript_function")
    stop("Can only wrap javascript_function s");
  function(...) {
    Rserve::self.oobMessage(list(s, ...))
  }
}

MODULE_DIR <- file.path(getwd(), "modules")

wrap.r.fun <- Rserve:::ocap

give.first.functions <- function()
{
    data <- iris[, c("Sepal.Length", "Petal.Length")]
    list(
        rversion = wrap.r.fun(function() as.character(getRversion())),
        use_module = wrap.r.fun(function(name) {
          mod_file <- sprintf("%s/%s.R", MODULE_DIR, name)
          if (!file.exists(mod_file)) return(list())

          mod_env <- new.env()
          source(mod_file, local = mod_env)

          lapply(as.list(mod_env),
            function(x) {
              if (is.function(x)) wrap.r.fun(x) else x
            }
          )
        })
    )
}

####################################################################################################
# make.oc turns a function into an object capability accessible from the remote side

# oc.init must return the first capability accessible to the remote side
oc.init <- function()
{
  wrap.r.fun(give.first.functions)
}
