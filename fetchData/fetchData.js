import axios from "axios";
export const addData = async (data) => {
    try {
        const newData = await axios.post("/api/contacts", data);
        return newData
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getData = async () => {
    try {
        const getContacts = await axios.get("/api/contacts");
        return getContacts
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateData = async (id, data) => {
    try {
        await axios.put("/api/contacts?id=" + id, data);
    } catch (error) {
        throw new Error(error.message)
    }
}

export const removeData = async (id) => {
    try {
        await axios.delete("/api/contacts?id=" + id);
    } catch (error) {
        throw new Error(error.message)
    }
}