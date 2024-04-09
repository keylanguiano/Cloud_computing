const admin = require ('../config/firebase')
const firestore = admin.firestore ()
const IUser = require (('../interfaces/iUser'))
const bcrypt = require ('bcrypt')

class User extends IUser
{
    constructor (email, password)
    {
        super ()
        this.email = email
        this.password = password
    }

    static async createUser (email, password)
    {
        try 
        {
            const hash = await bcrypt.hash (password, 10)
            const user = firestore.collection ('users').doc (email)

            await user.set
            ({
                email, 
                password: hash
            })

            return new User (email, password)
        } 
        catch (err) 
        {
            console.log ('@ Keyla => error ', err)

            // Se crea el error que recibe el catch donde se llame la función
            throw new Error ('Error creating user')
        }
    }

    async verifyPassword (password)
    {
        return await bcrypt.compare (password, this.password)
    }

    static async findByEmail (email)
    {
        try 
        {
            // Busca el usuario para verificar que existe el email, con firebase admin se puede en una sola línea 
            const user = firestore.collection ('users').doc (email)
            const userDoc = await user.get ()

            if (userDoc.exists)
            {
                const userData = userDoc.data ()

                return new User (userData.email, userData.password)
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => error ', err)
            throw new Error ('Error finding user')
        }
    }
}

module.exports = User