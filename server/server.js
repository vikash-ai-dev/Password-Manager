const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const Password = require('./models/password');
require('dotenv').config();
const { encryptPassword, decryptPassword } = require('./utils/encryption');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/passop")
    .then(() => console.log("MongoDB Connected!"))
    .catch((error) => console.log("Mongo error:", error));

app.get('/api/passwords', async (req, res) => {
    try {
        const passwords = await Password.find();

        const decryptedPassword = passwords.map(item => {
            return {
                ...item.toObject(),
                password: decryptPassword(item.password)
            };
        });
        res.status(200).json(decryptedPassword);
    }
    catch (error) {
        console.error('Fetch passwords error:', error);
        res.status(500).json({

            message: "Failed to fetch password"

        });
    }
});

app.post('/api/passwords', async (req, res) => {
    const { site, username, password } = req.body;

    try {

        if (
            typeof site !== 'string' || !site.trim() || typeof username !== 'string' || !username.trim() || typeof password !== 'string' || !password.trim()
        ) {
            return res.status(400).json({
                message: `All fields are required`
            });
        }
        const encryptedData = encryptPassword(password);

        const newPassword = await Password.create({
            site: site.trim(),
            username: username.trim(),
            password: encryptedData
        });

        res.status(201).json({
            message: "Password saved successfully",
            id: newPassword._id
        })

    } catch (error) {
        console.error('Save password error:', error);
        res.status(500).json({ message: "Failed to save password" });
    }

});

app.delete('/api/passwords/:id', async (req, res) => {
    try {
        const deletedPassword = await Password.findByIdAndDelete(req.params.id);

        if (!deletedPassword) {
            return res.status(404).json({
                message: "Password not found"
            });
        }
        res.json({ message: "Password deleted successfully" })

    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete password"
        })
    }
})

app.patch('/api/passwords/:id', async (req, res) => {
    try {
        const { site, username, password } = req.body;

        if (
            typeof site !== "string" || !site.trim() ||
            typeof username !== "string" || !username.trim() ||
            typeof password !== "string" || !password.trim()
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const encryptedData = encryptPassword(password);

        const updatedPassword = await Password.findByIdAndUpdate(req.params.id, {
            site: site.trim(),
            username: username.trim(),
            password: encryptedData
        },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!updatedPassword) {
            res.status(404).json({
                message: 'Password not found'
            })
        }

        res.json({
            message: 'Password updated successfully'
        });

    }
    catch (error) {
        console.error('Update password error:', error);

        res.status(500).json({
            message: "Failed to patch password"
        });
    }
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});