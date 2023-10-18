import RequirementsApi from "./handlers/index"

const server = Bun.serve({
    port: Bun.env.PORT || 3001,
    hostname: "0.0.0.0",
    fetch: RequirementsApi
})

console.log(`Servidor rodando em http://${server.hostname}:${server.port}`)