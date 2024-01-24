import {body} from 'express-validator'

export const registerValidator = [
    body('email',"There is not correct an email").isEmail(),
    body('fullName',"You name string is minimum for 2 and max for 10").isString().isLength({min:2,max:10}),
    body('lastName',"You last name string is minimum for 2 and max for 10").isString().isLength({min:2,max:10}),
    body('password',"You password is about for 5").isString().isLength({min:5}),
    body('image').optional().isURL()
]

export const loginValidation = [
    body('email',"There is not correct an email").isEmail(),
    body('password',"You password is about for 5").isString().isLength({min:5}),
]

export const postCreateValidation = [
    body('title',"Введите заголовок статьи").isLength({min:3}).isString(),
    body('text',"Введите текст статьи").isLength({min:10}).isString(),
    body('tags',"Не верный формат тэгов (укажите массив)").optional().isString(),
    body('image','Не верная ссылка на изображение').optional().isString()
]