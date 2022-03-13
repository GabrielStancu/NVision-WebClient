import { ISpecification } from './specification.interface';

export class MultiFieldSpecification<T> implements ISpecification<T> {

    constructor(private specifications: ISpecification<T>[]) {}

    isSatisfied(t: T): boolean {
        for (const specification of this.specifications) {
            if (!specification.isSatisfied(t)) {
                return false;
            }
        }
        return true;
    }
}
