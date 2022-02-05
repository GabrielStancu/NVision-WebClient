import { ISpecification } from "./specification.interface";

export class MultiFieldSpecification<T> implements ISpecification<T> {

    constructor(private specifications: ISpecification<T>[]) {}

    isSatisfied(t: T): boolean {
        for (let i = 0; i < this.specifications.length; i++) {
            if (!this.specifications[i].isSatisfied(t)) {
                return false;
            }
        }
        return true;
    }

}