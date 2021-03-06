import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import sendMailService from "../services/sendMailService";

class SendMailController {
    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body

        const usersRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surverysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({email});

        if(!user)
            throw new AppError("User does not exists!");

        const survey = await surveyRepository.findOne({ id: survey_id});

        if(!survey) 
            throw new AppError("Surveys does not exists!");

        const surveryUserAlreadyExists = await surverysUsersRepository.findOne({
            where: {user_id: user.id, value: null}
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL 
        };

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        if(surveryUserAlreadyExists) {
            variables.id = surveryUserAlreadyExists.id;
            await sendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveryUserAlreadyExists);
        }

        // salvar as informaçoes na tableas surveyUser
        const surveyUser = surverysUsersRepository.create({
            user_id: user.id,
            survey_id
        });
        await surverysUsersRepository.save(surveyUser);
        
        // enviar email para o usuario

        variables.id = surveyUser.id;
        await sendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController };
