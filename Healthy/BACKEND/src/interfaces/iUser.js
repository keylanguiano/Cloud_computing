class IUser 
{
    /*  Crea el nuevo usuario 
        @param {string} email: Correo del usuario
        @param {string} password: Password del usuario

        @returns {Promise <User>}

        @throws {error}: Si hay error en la creación
    */
    static async createUser (email, password) {}

    /*  Busca si el usuario existe mediante el email
        @param {string} email: Correo del usuario

        @returns {Promise <User>}

        @throws {error}: Si hay error al encontrar el usuario
    */
    static async findByEmail (email) {}

    /*  Verifica que la contraseña coincida
        @param {string} password: Password del usuario

        @returns {boolean}
    */
    async verifyPassword (password) {}
}

module.exports = IUser