import { Attribute } from "./AttributeModel";

export class Employee{

    constructor()
    constructor(
    public id ?: number,
    public name ?: String,
    public hireDate ?: Date,
    public address ?: String,
    public hasCar ?: Boolean,
    public birthDate ?: Date,
    public employeeAttributes ?: Array<Attribute>,
    public supervisorId ?: number
    ) {}

}