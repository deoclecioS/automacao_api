import agent from 'supertest'
import { env } from './environment'


export const config = () =>{
    return {
        baseUrl: env().baseUrl
    }
}

export const request = () =>{
    return agent(config().baseUrl)
}