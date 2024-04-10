const jwt = require ('jsonwebtoken')
const user = require ('../models/userModel')

const loginUser = async (req, res) =>
{
    try
    {
        const { email, password } = req.body

        // Busca el usuario para verificar que existe el email con el modelo
        const userDoc = await user.findByEmail (email)

        // Si no existe
        if (!userDoc)
        {
            return res.status (404).json
            ({
                message: 'User not found'
            })
        }

        // Si el password es correcto
        const isValidPassword = await userDoc.verifyPassword (password)

        if (!isValidPassword)
        {
            return res.status (401).json
            ({
                message: 'Invalid Credentials'
            })
        }

        // Token
        const token = jwt.sign ({ email: userDoc.email }, process.env.SECRET, { expiresIn: '1h' })

        res.status (200).json ({ token })
    }
    catch (err)
    {
        res.status (500).json
        ({
            message: 'Internal Server Error'
        })
    }
}

const registerUser = async (req, res) =>
{
    try 
    {
        const { email, password } = req.body

        const existingUser = await user.findByEmail (email)

        if (existingUser)
        {
            return res.status (400).json
            ({
                message: 'User already exists'
            })
        }

        const newuser = await user.createUser (email, password)

        res.status (201).json
        ({
            message: 'User registered successfully',
            user: newuser
        })
    } 
    catch (err) 
    {
        res.status (500).json
        ({
            message: 'Internal Server Error'
        })
    }
}

module.exports = { registerUser, loginUser }