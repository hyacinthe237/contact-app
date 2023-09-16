import { connect } from "@/connect/connect"
import { Contacts } from "@/contactSchema/contact";
import { NextResponse } from "next/server";

connect();

export const POST = async (req) => {
    const { fullName, email, phoneNumber, address } = await req.json();
    try {
        const newContact = await Contacts.create({fullName, email, phoneNumber, address})
        return NextResponse.json(newContact);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const GET = async () => {
    try {
        const getContacts = await Contacts.find();
        return NextResponse.json(getContacts)
    } catch (error) {
        throw new Error(error.message);
    }
}

export const DELETE = async (req) => {
    const id = req.nextUrl.searchParams.get("id");
    try {
        await Contacts.findByIdAndDelete(id);
        return NextResponse.json({ msg: "Contact is deleted"}, { status: 200 })
    } catch (error) {
        throw new Error(error.message);
    }
}

export const PUT = async (req) => {
    const id = req.nextUrl.searchParams.get("id");
    const { fullName, email, phoneNumber, address } = await req.json();
    try {
        const updatedContact = await Contacts.findByIdAndUpdate(id, { fullName, email, phoneNumber, address });
        return NextResponse.json(updatedContact)
    } catch (error) {
        throw new Error(error.message);
    }
}