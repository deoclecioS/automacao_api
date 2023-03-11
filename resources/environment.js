export const env = () => {

    const env = String(process.env.AMBIENTE).toLowerCase()

    switch (env) {
        case 'dev':
            return dev

        case 'local':
            return local

        default:
            return dev
    }
}

const dev = {
    baseUrl: "https://agilizei.serverest.dev"
}

const local = {
    baseUrl: "https://8080" // trocar para uma url valida
}