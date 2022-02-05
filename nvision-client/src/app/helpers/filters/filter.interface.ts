import { ISpecification } from "../specifications/specification.interface";

export interface IFilter<T> {
    filter(items: T[], specification: ISpecification<T>);
}