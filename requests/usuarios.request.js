import { request } from '../resources/config'


class usuariosRequest {

    async postUsuarios(body) {

        return request()
            .post('/usuarios')
            .send(body)
    }

    async getUsuarios(query) {
        return request()
            .get('/usuarios')
            .query(query)
    }

    async putUsuarios(_id, body) {
        return request()
            .put(`/usuarios/${_id}`)
            .send(body)
    }

    async getUsuariosBy_ID(_id) {
        return request()
            .get(`/usuarios/${_id}`)
    }

    async deleteUsuarios(_id) {
        return request()
            .delete(`/usuarios/${_id}`)
    }
}

export default new usuariosRequest() 