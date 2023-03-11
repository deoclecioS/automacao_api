
import usuarios from '../requests/usuarios.request'

describe('POST /usuarios', () => {

    beforeAll(async () => {

        await usuarios.postUsuarios({
            "nome": "Preciso um PC Novo",
            "email": "beltrano@qa.com.br",
            "password": "teste123",
            "administrador": "false"
        })
    })

    test('Não Cadastrar usuário com email repetido', async () => {

        const response = await usuarios.postUsuarios({
            "nome": "Preciso um PC Novo",
            "email": "beltrano@qa.com.br",
            "password": "teste123",
            "administrador": "false"
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Este email já está sendo usado')
    })

    test('Cadastrar usuário com email válido', async () => {

        const email = `${new Date().getTime()}-teste@qa.com.br`
        const response = await usuarios.postUsuarios({
            "nome": "Usuario novo com email valido",
            "email": email,
            "password": "teste123",
            "administrador": "true"
        })

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('Cadastro realizado com sucesso')
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toMatchObject({
            message: expect.any(String),
            _id: expect.any(String)
        })

    })
});

describe('GET /usuarios', () => {


    test('Consultar listagem de usuários cadastrados', async () => {

        const response = await usuarios.getUsuarios()

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('quantidade')
        expect(response.body).toHaveProperty('usuarios')

        expect(response.body.usuarios.length).toBeGreaterThan(0)
    })

    test('Consultar listagem de usuários administradores', async () => {

        const response = await usuarios.getUsuarios({
            administrador: 'true'
        })

        expect(response.status).toBe(200)

        Array.from(response.body.usuarios).forEach(usuario => {
            expect(usuario.administrador).toBe("true")
        })
        //console.log(response.body.usuarios)

    })

});

describe('PUT /usuarios/:id', () => {

    test('Alterar cadastro de um usuário existente', async () => {

        const email = `${new Date().getTime()}-test_editar@qa.com.br`
        const postUsuarioResponse = await usuarios.postUsuarios({
            "nome": "Usuario para alterar o nome",
            "email": email,
            "password": "teste123",
            "administrador": "false"
        })

        const { _id } = postUsuarioResponse.body

        const putUsuarioResponse = await usuarios.putUsuarios(_id, {
            "nome": "Usuario Com o nome alterado",
            "email": email,
            "password": "atpi=123",
            "administrador": "false"
        })

        expect(putUsuarioResponse.status).toBe(200)
        expect(putUsuarioResponse.body.message).toBe('Registro alterado com sucesso')

        // confirmar alteração do cadastro

        const getUsuarioIdResponse = await usuarios.getUsuariosBy_ID(_id)

        //console.log(getUsuarioIdResponse.body)
        expect(getUsuarioIdResponse.body.nome).toBe('Usuario Com o nome alterado')
    })
})

describe('DELETE /usuarios/:id', () => {

    test('Remover cadastro de um usuário existente', async () => {

        const email = `${new Date().getTime()}-test_editar@qa.com.br`
        const postUsuarioResponse = await usuarios.postUsuarios({
            "nome": "Usuario para ser deletado",
            "email": email,
            "password": "teste123",
            "administrador": "false"
        })

        const { _id } = postUsuarioResponse.body

        const deleteUsuarioResponse = await usuarios.deleteUsuarios(_id)

        expect(deleteUsuarioResponse.status).toBe(200)
        expect(deleteUsuarioResponse.body.message).toBe('Registro excluído com sucesso')
    })
})

