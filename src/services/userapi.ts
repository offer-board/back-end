import express, { Request, Response, NextFunction } from 'express';
import UserModel from "../model/user";

export async function postuser (request: Request, response: Response, next: NextFunction) {
    let email = request.body.email;
    let name = request.body.name;
    let userfound = UserModel.find({email: email});
    if (userfound) {
        response.status(400).json({error: "Email already exists!"});
        return
    }
    await UserModel.create({email, name})
    response.status(200).json({message: "User successfully created!"});
}

export async function getuser (request: Request, response: Response, next: NextFunction) {
    let email = request.params.email;
    UserModel.findOne({email: email}).lean().exec(function(err, doc) {
        response.status(200).json({user: doc});
    });
}

export async function getsearch (request: Request, response: Response, next: NextFunction) {
    let email = request.params.email;
    let searchTerm = request.params.searchTerm;
    UserModel.findOne({email: email, $text: {$search: searchTerm}}).lean().exec(function(err, doc) {
        response.status(200).json({user: doc});
    });
}

export async function postCompany (request: Request, response: Response, next: NextFunction) {
    let email = request.params.email;
    let company = request.body.company;
    let userfound = await UserModel.findOne({email: email});
    userfound.jobs.push({company: company, positions: []});
    await userfound.save();
    response.status(200).json({message: "Company successfully added!"});
}

export async function postPosition (request: Request, response: Response, next: NextFunction) {
    let email = request.params.email;
    let company = request.params.company;
    let title = request.body.title;
    let type = request.body.type;
    let userfound = await UserModel.findOne({email: email});
    userfound.jobs.id({_id: company}).positions.push({title: title, type: type, status: []});
    await userfound.save();
    response.status(200).json({message: "Company successfully added!"});
}

export async function postStatus (request: Request, response: Response, next: NextFunction) {
    let email = request.params.email;
    let company = request.params.company;
    let position = request.params.position;
    let color = request.body.color;
    let code = request.body.code;
    let note = request.body.note;
    let date = request.body.date;
    let userfound = await UserModel.findOne({email: email});
    userfound.jobs.id({_id: company}).positions.id({_id: position}).status.push({color, code, note, date});
    await userfound.save();
    response.status(200).json({message: "Company successfully added!"});
}